CREATE TABLE public.tblorder (
  orderid bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  orderdate timestamp with time zone NOT NULL DEFAULT now(),
  customerid bigint,
  statusid smallint,
  CONSTRAINT tblorder_pkey PRIMARY KEY (orderid),
  CONSTRAINT tblorder_statusid_fkey FOREIGN KEY (statusid) REFERENCES public.tblorderstatus(statusid),
  CONSTRAINT tblorder_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.tblcustomer(customerid)
);
CREATE TABLE public.tblitem (
  itemid bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  itemname text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0::numeric),
  categoryid bigint,
  itemdesc text CHECK (length(itemdesc) < 500),
  stock smallint CHECK (stock IS NULL OR stock >= 0),
  CONSTRAINT tblitem_pkey PRIMARY KEY (itemid),
  CONSTRAINT tblitem_categoryid_fkey FOREIGN KEY (categoryid) REFERENCES public.tblcategories(categoryid)
);
CREATE TABLE public.tblcategories (
  categoryid bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  category text NOT NULL UNIQUE,
  CONSTRAINT tblcategories_pkey PRIMARY KEY (categoryid)
);
CREATE TABLE public.tblorderitem (
  orderid bigint NOT NULL,
  itemid bigint NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  itemname_at_purchase text NOT NULL,
  unitprice numeric NOT NULL CHECK (unitprice >= 0::numeric),
  CONSTRAINT tblorderitem_pkey PRIMARY KEY (orderid, itemid),
  CONSTRAINT tblorderitem_orderid_fkey FOREIGN KEY (orderid) REFERENCES public.tblorder(orderid),
  CONSTRAINT tblorderitem_itemid_fkey FOREIGN KEY (itemid) REFERENCES public.tblitem(itemid)
);
CREATE TABLE public.tblcustomer (
  customerid bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  username text NOT NULL,
  email text,
  clerk_user_id text,
  CONSTRAINT tblcustomer_pkey PRIMARY KEY (customerid)
);
CREATE TABLE public.tbladdress (
  addressid bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  addressline1 text NOT NULL,
  addressline2 text,
  city text NOT NULL,
  postalcode text,
  country text NOT NULL,
  created_by text NOT NULL DEFAULT (auth.jwt() ->> 'sub'::text),
  CONSTRAINT tbladdress_pkey PRIMARY KEY (addressid)
);
CREATE TABLE public.tblcustomeraddress (
  customerid bigint NOT NULL,
  addressid bigint NOT NULL,
  isdefault boolean NOT NULL DEFAULT false,
  CONSTRAINT tblcustomeraddress_pkey PRIMARY KEY (customerid, addressid),
  CONSTRAINT tblcustomeraddress_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.tblcustomer(customerid),
  CONSTRAINT tblcustomeraddress_addressid_fkey FOREIGN KEY (addressid) REFERENCES public.tbladdress(addressid)
);
CREATE TABLE public.tblorderstatus (
  statusid smallint NOT NULL,
  statusname text NOT NULL UNIQUE,
  CONSTRAINT tblorderstatus_pkey PRIMARY KEY (statusid)
);
CREATE TABLE public.tblordershippingaddress (
  orderid bigint NOT NULL,
  addressline1 text NOT NULL,
  addressline2 text,
  city text NOT NULL,
  postalcode text,
  country text NOT NULL,
  CONSTRAINT tblordershippingaddress_pkey PRIMARY KEY (orderid),
  CONSTRAINT tblordershippingaddress_orderid_fkey FOREIGN KEY (orderid) REFERENCES public.tblorder(orderid)
);
CREATE TABLE public.tblcart (
  cartid bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  customerid bigint NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tblcart_pkey PRIMARY KEY (cartid),
  CONSTRAINT tblcart_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.tblcustomer(customerid)
);
CREATE TABLE public.tblcartitem (
  cartid bigint NOT NULL,
  itemid bigint NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  CONSTRAINT tblcartitem_pkey PRIMARY KEY (cartid, itemid),
  CONSTRAINT tblcartitem_cartid_fkey FOREIGN KEY (cartid) REFERENCES public.tblcart(cartid),
  CONSTRAINT tblcartitem_itemid_fkey FOREIGN KEY (itemid) REFERENCES public.tblitem(itemid)
);
CREATE TABLE public.tbluser_roles (
  clerk_user_id text NOT NULL,
  role text NOT NULL DEFAULT 'regular_user'::text CHECK (role = ANY (ARRAY['regular_user'::text, 'event_admin'::text, 'store_event_admin'::text])),
  assigned_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tbluser_roles_pkey PRIMARY KEY (clerk_user_id)
);
CREATE TABLE public.tblevents (
  event_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL CHECK (length(TRIM(BOTH FROM name)) > 0),
  event_date date,
  description text,
  created_by text NOT NULL DEFAULT (auth.jwt() ->> 'sub'::text),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tblevents_pkey PRIMARY KEY (event_id)
);
CREATE TABLE public.tblevent_posts (
  post_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  event_id bigint NOT NULL,
  title text NOT NULL CHECK (length(TRIM(BOTH FROM title)) > 0),
  body text,
  created_by text NOT NULL DEFAULT (auth.jwt() ->> 'sub'::text),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by text NOT NULL DEFAULT (auth.jwt() ->> 'sub'::text),
  CONSTRAINT tblevent_posts_pkey PRIMARY KEY (post_id),
  CONSTRAINT event_posts_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.tblevents(event_id)
);
CREATE TABLE public.tblevent_images (
  image_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  post_id bigint NOT NULL,
  storage_path text NOT NULL UNIQUE,
  caption text,
  sort_order integer NOT NULL DEFAULT 0,
  created_by text NOT NULL DEFAULT (auth.jwt() ->> 'sub'::text),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tblevent_images_pkey PRIMARY KEY (image_id),
  CONSTRAINT event_images_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.tblevent_posts(post_id)
);