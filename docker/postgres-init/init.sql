--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Menu-Item; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Menu-Item" (
    menu_id character varying NOT NULL,
    item_id character varying NOT NULL
);


ALTER TABLE public."Menu-Item" OWNER TO "user";

--
-- Name: Order; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Order" (
    order_id uuid NOT NULL,
    client_id uuid,
    delivery_address character varying,
    pay_status boolean,
    total_price numeric(10,2),
    accepted_by_restaurant boolean DEFAULT false
);


ALTER TABLE public."Order" OWNER TO "user";

--
-- Name: Order-Menu; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Order-Menu" (
    order_id uuid NOT NULL,
    menu_id character varying NOT NULL
);


ALTER TABLE public."Order-Menu" OWNER TO "user";

--
-- Name: User; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."User" (
    user_id uuid NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone_number character varying(15),
    birthday_date timestamp with time zone NOT NULL,
    created_at timestamp with time zone,
    role character varying(255) DEFAULT 'user'::character varying NOT NULL
);


ALTER TABLE public."User" OWNER TO "user";

--
-- Name: delivery; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.delivery (
    delivery_id uuid NOT NULL,
    order_id uuid,
    driver_id uuid,
    status character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    qr_code text
);


ALTER TABLE public.delivery OWNER TO "user";

--
-- Name: item; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.item (
    item_id character varying NOT NULL,
    restaurant_id uuid,
    name character varying,
    price numeric,
    description character varying,
    ingredients character varying,
    photo text
);


ALTER TABLE public.item OWNER TO "user";

--
-- Name: menu; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.menu (
    menu_id character varying NOT NULL,
    restaurant_id uuid NOT NULL,
    menu_name character varying(255) NOT NULL,
    menu_description character varying(255),
    created_at timestamp with time zone,
    menu_price numeric(10,2) DEFAULT 0 NOT NULL,
    menu_photo character varying(255)
);


ALTER TABLE public.menu OWNER TO "user";

--
-- Name: restaurant; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.restaurant (
    restaurant_id uuid NOT NULL,
    owner_restaurant uuid,
    name character varying,
    email character varying,
    phone_number character varying(15),
    adress character varying,
    open_hour character varying,
    close_hour character varying
);


ALTER TABLE public.restaurant OWNER TO "user";

--
-- Data for Name: Menu-Item; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Menu-Item" (menu_id, item_id) FROM stdin;
menu-r1-1	item-001
menu-r1-1	item-004
menu-r1-2	item-002
menu-r1-3	item-002
menu-r1-3	item-005
menu-r1-4	item-003
menu-r1-4	item-002
menu-r1-5	item-003
menu-r1-5	item-004
menu-r1-6	item-003
menu-r1-6	item-005
menu-r1-7	item-001
menu-r2-1	item-006
menu-r2-1	item-008
menu-r2-2	item-006
menu-r2-3	item-007
menu-r2-3	item-008
menu-r2-4	item-006
menu-r2-4	item-007
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Order" (order_id, client_id, delivery_address, pay_status, total_price, accepted_by_restaurant) FROM stdin;
c58d126a-ef9d-44ff-aa72-b841ca5e5401	00000000-0000-0000-0000-000000000001	Campus des Sciences Toulouse Rangueil, 5 Imp. André Marfaing 1,3, 31400 Toulouse	f	19.50	f
671622d9-08d8-4a2a-8bf4-85eecf2d64e9	00000000-0000-0000-0000-000000000001	Campus des Sciences Toulouse Rangueil, 5 Imp. André Marfaing 1,3, 31400 Toulouse	f	17.50	t
c10945c8-0abb-43ff-85c2-b64b89be727e	00000000-0000-0000-0000-000000000001	5 Impasse André Marfaing, 31400 TOULOUSE	f	38.50	t
0a1236bf-cc63-4895-a0c4-fab224a93a95	00000000-0000-0000-0000-000000000001	Campus des Sciences Toulouse Rangueil, 5 Imp. André Marfaing 1,3, 31400 Toulouse	f	34.50	t
71572d90-6cb5-479a-9327-06c21b43b607	00000000-0000-0000-0000-000000000001	Campus des Sciences Toulouse Rangueil, 5 Imp. André Marfaing 1,3, 31400 Toulouse	f	37.50	t
3d1c4cf0-0459-4c2a-aa33-1bb7ab282b53	00000000-0000-0000-0000-000000000001	Campus des Sciences Toulouse Rangueil, 5 Imp. André Marfaing 1,3, 31400 Toulouse	f	27.50	t
\.


--
-- Data for Name: Order-Menu; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Order-Menu" (order_id, menu_id) FROM stdin;
671622d9-08d8-4a2a-8bf4-85eecf2d64e9	menu-r1-2
671622d9-08d8-4a2a-8bf4-85eecf2d64e9	menu-r1-3
c58d126a-ef9d-44ff-aa72-b841ca5e5401	menu-r1-5
c58d126a-ef9d-44ff-aa72-b841ca5e5401	menu-r1-2
c10945c8-0abb-43ff-85c2-b64b89be727e	menu-r1-5
c10945c8-0abb-43ff-85c2-b64b89be727e	menu-r1-6
c10945c8-0abb-43ff-85c2-b64b89be727e	menu-r1-7
0a1236bf-cc63-4895-a0c4-fab224a93a95	menu-r1-3
0a1236bf-cc63-4895-a0c4-fab224a93a95	menu-r2-1
71572d90-6cb5-479a-9327-06c21b43b607	menu-r1-7
71572d90-6cb5-479a-9327-06c21b43b607	menu-r1-5
3d1c4cf0-0459-4c2a-aa33-1bb7ab282b53	menu-r1-4
3d1c4cf0-0459-4c2a-aa33-1bb7ab282b53	menu-r1-3
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."User" (user_id, first_name, last_name, email, password, phone_number, birthday_date, created_at, role) FROM stdin;
00000000-0000-0000-0000-000000000001	Alice	Durand	alice@example.com	hashedpwd1	0600000001	1990-01-01 00:00:00+00	2025-06-18 17:14:12.948316+00	owner
00000000-0000-0000-0000-000000000002	Bob	Martin	bob@example.com	hashedpwd2	0600000002	1985-05-05 00:00:00+00	2025-06-18 17:14:12.948316+00	owner
4bc7dc5a-096f-4477-a1c0-275b19c44bf8	Mohamed dhia	Rabaaoui	dhia.rabaaoui@esprit.tn	$2b$10$eu1ycu824ZYUV7bqTavTOel1sJMFxadiEW1LnzbkujJQIgs/0IJpC	0605894652	2001-09-01 00:00:00+00	2025-06-18 15:34:47.265+00	client
3d4c1259-fa27-4953-a612-8499d2841a0c	Mohamed dhia	Rabaaoui	shainsaber@gmail.com	$2b$10$f/nEw6lj4i3U2q/BhB40H.xF4r9EpH7FkmlKibKuSYlkI2uH//vzi	0605894652	2001-09-01 00:00:00+00	2025-06-18 20:42:36.102+00	restaurant
c753abde-e32f-42fa-b726-a5839f8acf06	Mohamed dhia	Rabaaoui	Haroun0565rabaaoui@gmail.com	$2b$10$UC/Rur1O45uGP8mmutO0UeHFypcX5scHXS2epfQsiInffmsh/oiq2	0605894652	2001-09-01 00:00:00+00	2025-06-18 20:39:55.383+00	restaurant
f35f9910-f496-4b85-b18b-969a8b32d89e	joj	yuh	chepkoech@gmail.com	$2b$10$zaKq6lYy5I6gUsRLB8lTEu5qFQrnH2r5W9DuBOmCvci.ZNl9MmhXC	0605894652	2023-11-08 00:00:00+00	2025-06-19 07:18:14.695+00	delivery
eee12074-e0fa-4c60-9815-436bca9836a8	Maria	Perez	maria@mail.com	$2b$10$pqWxxQkG6idpLBhTb2rd6Optls.Sti7CKy7WB6YONW2Cv08momSMS	51515615	2025-06-06 00:00:00+00	2025-06-19 07:35:57.996+00	restaurant
5fc3e8e7-9029-487a-a7e4-a6a0753019ba	lucia	delgado	lucia@mail.com	$2b$10$cRE.nFVQCNZAoeIYrgb9IejSpXZuP6wBUF2B9O0//RMjJbn4nrS3e	515161	2025-05-30 00:00:00+00	2025-06-19 07:42:23.002+00	client
6ac3ba75-49da-4faa-ae04-18228217d9bf	Delfina	Ferreri	delfiferreri23@gmail.com	$2b$10$8jfkFkxourC1w7EsLe/lAeBRx32Vcu0KfIJQn2Au.uf.rblbU8GFW	+54 92284373404	2002-07-23 00:00:00+00	2025-06-20 09:23:27.328+00	restaurant
63d7f610-3e79-420c-ab8a-9932d4c1f5c3	Mohamed dhia	Rabaaoui	dhia.alternance@gmail.com	$2b$10$RJV2cPkuq0xLFsfleoM2DuFEqYhvMWdbVkj1.7w08Mm5fZKUKVBZG	0605894652	2001-09-01 00:00:00+00	2025-06-20 10:25:17.769+00	restaurant
aae68e61-5274-4e83-a361-90564cdd67a9	Mohamed dhia	Rabaaoui	dhia01rabaaoui@gmail.com	$2b$10$ASo.4xZA0.1FlCKXLiP5RuDzukIyPGAg7WYj/sqjhPgCwcz12Vor.	0605894652	2001-09-01 00:00:00+00	2025-06-20 10:32:19.881+00	client
022fdd0a-41cf-4ea2-9827-65365f027f1f	Mohamed dhia	Rabaaoui	rabaaouibac@gmail.com	$2b$10$sdsNJwxdf3Bge.RlOZn2QOtdTwNJpzgBlq1aJrfX7.aj0gS/gk0ai	0605894652	2001-09-01 00:00:00+00	2025-06-20 10:32:57.394+00	delivery
\.


--
-- Data for Name: delivery; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.delivery (delivery_id, order_id, driver_id, status, created_at, qr_code) FROM stdin;
\.


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.item (item_id, restaurant_id, name, price, description, ingredients, photo) FROM stdin;
item-001	10000000-0000-0000-0000-000000000001	Pepperoni Pizza	12.50	Pizza au pepperoni croustillante	Fromage, Pepperoni, Tomate	pepperoni.jpg
item-002	10000000-0000-0000-0000-000000000001	Beef Empanada	7.00	Chausson fourré au bœuf	Bœuf, Oignon, Pâte	empanada.jpg
item-003	10000000-0000-0000-0000-000000000001	Lasagnes Maison	10.00	Lasagnes gratinées au four	Pâtes, Viande, Fromage	lasagne.jpg
item-004	10000000-0000-0000-0000-000000000001	Coca-Cola	2.50	Boisson gazeuse rafraîchissante	Eau, Sucre, CO2	coca.jpg
item-005	10000000-0000-0000-0000-000000000001	Frites maison	3.50	Frites dorées croustillantes	Pommes de terre, Sel	frites.jpg
item-006	10000000-0000-0000-0000-000000000002	Cheeseburger	9.50	Burger au fromage fondant	Pain, Steak, Fromage	burger.jpg
item-007	10000000-0000-0000-0000-000000000002	Salade César	8.00	Salade avec poulet grillé	Laitue, Poulet, Croutons	cesar.jpg
item-008	10000000-0000-0000-0000-000000000002	Pepsi	2.50	Boisson gazeuse sucrée	Eau, Sucre, CO2	pepsi.jpg
\.


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.menu (menu_id, restaurant_id, menu_name, menu_description, created_at, menu_price, menu_photo) FROM stdin;
menu-r1-2	10000000-0000-0000-0000-000000000001	tacos	\N	\N	7.00	menu2.jpg
menu-r1-3	10000000-0000-0000-0000-000000000001	cheese	\N	\N	10.50	menu3.jpg
menu-r1-4	10000000-0000-0000-0000-000000000001	Beef Empanada	\N	\N	17.00	menu4.jpg
menu-r1-5	10000000-0000-0000-0000-000000000001	Lasagnes 	\N	\N	12.50	menu5.jpg
menu-r1-6	10000000-0000-0000-0000-000000000001	Lasagnes Frites 	\N	\N	13.50	menu6.jpg
menu-r1-7	10000000-0000-0000-0000-000000000001	Pepperoni Pizza	\N	\N	12.50	menu7.jpg
menu-r2-1	10000000-0000-0000-0000-000000000002	Cheeseburger 	\N	\N	12.00	menu8.jpg
menu-r2-2	10000000-0000-0000-0000-000000000002	Cheeseburger	\N	\N	9.50	menu2.jpg
menu-r2-3	10000000-0000-0000-0000-000000000002	Salade Césari	\N	\N	10.50	menu10.jpg
menu-r2-4	10000000-0000-0000-0000-000000000002	Cheeseburger + Salade César	\N	\N	17.50	menu11.jpg
menu-r1-1	10000000-0000-0000-0000-000000000001	Pizza	\N	\N	15.00	menu1.jpg
\.


--
-- Data for Name: restaurant; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.restaurant (restaurant_id, owner_restaurant, name, email, phone_number, adress, open_hour, close_hour) FROM stdin;
10000000-0000-0000-0000-000000000001	00000000-0000-0000-0000-000000000001	Chez Alice	contact@chezalice.fr	0102030405	10 rue des Lilas	11:00	23:00
10000000-0000-0000-0000-000000000002	00000000-0000-0000-0000-000000000002	Le Bob Diner	contact@lebob.fr	0605040302	20 avenue des Platanes	12:00	22:00
\.


--
-- Name: Menu-Item Menu-Item_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Menu-Item"
    ADD CONSTRAINT "Menu-Item_pkey" PRIMARY KEY (menu_id, item_id);


--
-- Name: Order-Menu Order-Menu_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Order-Menu"
    ADD CONSTRAINT "Order-Menu_pkey" PRIMARY KEY (order_id, menu_id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (order_id);


--
-- Name: User User_email_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- Name: User User_email_key1; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key1" UNIQUE (email);


--
-- Name: User User_email_key10; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key10" UNIQUE (email);


--
-- Name: User User_email_key11; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key11" UNIQUE (email);


--
-- Name: User User_email_key12; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key12" UNIQUE (email);


--
-- Name: User User_email_key13; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key13" UNIQUE (email);


--
-- Name: User User_email_key14; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key14" UNIQUE (email);


--
-- Name: User User_email_key15; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key15" UNIQUE (email);


--
-- Name: User User_email_key16; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key16" UNIQUE (email);


--
-- Name: User User_email_key17; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key17" UNIQUE (email);


--
-- Name: User User_email_key18; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key18" UNIQUE (email);


--
-- Name: User User_email_key19; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key19" UNIQUE (email);


--
-- Name: User User_email_key2; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key2" UNIQUE (email);


--
-- Name: User User_email_key20; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key20" UNIQUE (email);


--
-- Name: User User_email_key21; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key21" UNIQUE (email);


--
-- Name: User User_email_key3; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key3" UNIQUE (email);


--
-- Name: User User_email_key4; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key4" UNIQUE (email);


--
-- Name: User User_email_key5; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key5" UNIQUE (email);


--
-- Name: User User_email_key6; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key6" UNIQUE (email);


--
-- Name: User User_email_key7; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key7" UNIQUE (email);


--
-- Name: User User_email_key8; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key8" UNIQUE (email);


--
-- Name: User User_email_key9; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_email_key9" UNIQUE (email);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (user_id);


--
-- Name: delivery delivery_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.delivery
    ADD CONSTRAINT delivery_pkey PRIMARY KEY (delivery_id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (item_id);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (menu_id);


--
-- Name: restaurant restaurant_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT restaurant_pkey PRIMARY KEY (restaurant_id);


--
-- Name: Menu-Item Menu-Item_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Menu-Item"
    ADD CONSTRAINT "Menu-Item_item_id_fkey" FOREIGN KEY (item_id) REFERENCES public.item(item_id) ON DELETE CASCADE;


--
-- Name: Menu-Item Menu-Item_menu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Menu-Item"
    ADD CONSTRAINT "Menu-Item_menu_id_fkey" FOREIGN KEY (menu_id) REFERENCES public.menu(menu_id) ON DELETE CASCADE;


--
-- Name: Order-Menu Order-Menu_menu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Order-Menu"
    ADD CONSTRAINT "Order-Menu_menu_id_fkey" FOREIGN KEY (menu_id) REFERENCES public.menu(menu_id) ON DELETE CASCADE;


--
-- Name: Order-Menu Order-Menu_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Order-Menu"
    ADD CONSTRAINT "Order-Menu_order_id_fkey" FOREIGN KEY (order_id) REFERENCES public."Order"(order_id) ON DELETE CASCADE;


--
-- Name: Order Order_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_client_id_fkey" FOREIGN KEY (client_id) REFERENCES public."User"(user_id) ON DELETE SET NULL;


--
-- Name: delivery delivery_driver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.delivery
    ADD CONSTRAINT delivery_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public."User"(user_id) ON DELETE SET NULL;


--
-- Name: delivery delivery_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.delivery
    ADD CONSTRAINT delivery_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."Order"(order_id) ON DELETE CASCADE;


--
-- Name: Menu-Item fk_item_id; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Menu-Item"
    ADD CONSTRAINT fk_item_id FOREIGN KEY (item_id) REFERENCES public.item(item_id);


--
-- Name: Menu-Item fk_menu_id; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Menu-Item"
    ADD CONSTRAINT fk_menu_id FOREIGN KEY (menu_id) REFERENCES public.menu(menu_id);


--
-- Name: item item_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(restaurant_id) ON DELETE CASCADE;


--
-- Name: menu menu_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(restaurant_id) ON DELETE CASCADE;


--
-- Name: restaurant restaurant_owner_restaurant_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT restaurant_owner_restaurant_fkey FOREIGN KEY (owner_restaurant) REFERENCES public."User"(user_id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

