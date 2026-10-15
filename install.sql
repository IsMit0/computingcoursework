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
  auth_user_id uuid UNIQUE,
  CONSTRAINT tblcustomer_pkey PRIMARY KEY (customerid),
  CONSTRAINT tblcustomer_auth_user_id_fkey FOREIGN KEY (auth_user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.tbladdress (
  addressid bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  addressline1 text NOT NULL,
  addressline2 text,
  city text NOT NULL,
  postalcode text,
  country text NOT NULL,
  created_by uuid NOT NULL,
  CONSTRAINT tbladdress_pkey PRIMARY KEY (addressid),
  CONSTRAINT tbladdress_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)
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