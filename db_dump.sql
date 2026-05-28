--
-- PostgreSQL database dump
--

\restrict WWWbWrAhEuj1FV0heMLAEAbwdzog6IoKBDfphbkbfNzxqaBsNDjp42zIh7ZpRqY

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

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
-- Name: attendance_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendance_sessions (
    id uuid NOT NULL,
    check_in time(0) without time zone,
    check_out time(0) without time zone,
    attendance_id uuid
);


ALTER TABLE public.attendance_sessions OWNER TO postgres;

--
-- Name: attendances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendances (
    id uuid NOT NULL,
    date date,
    status character varying(255),
    employee_id uuid
);


ALTER TABLE public.attendances OWNER TO postgres;

--
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    id uuid NOT NULL,
    department_name character varying(255),
    location character varying(255)
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id uuid NOT NULL,
    auth_role character varying(255),
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255),
    phone character varying(255),
    role character varying(255),
    department_id uuid
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id uuid NOT NULL,
    deadline date,
    project_name character varying(255),
    status character varying(255)
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: refresh_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_token (
    id uuid NOT NULL,
    expiry_date timestamp(6) without time zone NOT NULL,
    token character varying(255) NOT NULL,
    employee_id uuid
);


ALTER TABLE public.refresh_token OWNER TO postgres;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id uuid NOT NULL,
    description character varying(255),
    status character varying(255),
    title character varying(255),
    employee_id uuid,
    project_id uuid
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Data for Name: attendance_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendance_sessions (id, check_in, check_out, attendance_id) FROM stdin;
7f3e0df5-4d7f-48c3-80a0-3608ec7f3972	15:53:09	15:53:31	ab5eef54-b77a-415e-ade4-366ebd300775
\.


--
-- Data for Name: attendances; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendances (id, date, status, employee_id) FROM stdin;
ab5eef54-b77a-415e-ade4-366ebd300775	2026-05-28	PRESENT	d1caea7d-7fb3-4c5a-9c20-8774d1f60782
\.


--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, department_name, location) FROM stdin;
33f4b1c5-bffe-48ef-8e99-075604014cd0	Engineering	Chennai
f7920c71-0439-45d7-8b0c-63fe495600ba	Human Resources	Bangalore
e87cf280-d837-4c07-8ea0-e716cc5382f9	Finance	Mumbai
45349f69-1dd1-4d4f-92e3-ea1a1690ed30	Marketing	Hyderabad
a972f9e6-a3ad-46cf-b5e2-08207981c7c1	Sales	Delhi
01d77f8b-0ae9-4dc2-b9f1-3a76c1258be6	Operations	Pune
d1190bed-8c0f-44b6-b598-07a8f27696ed	Customer Support	Kolkata
601ff48e-28f3-4474-a03f-17484bf999ca	Research	Chennai
798b102b-5d3c-4f53-a91e-01ccac22db08	Product Management	Bangalore
e6d41911-5701-4367-b800-c71a52dd600d	Cyber Security	Hyderabad
9d30a54f-92ab-4ba7-a1d0-cf7bf0b2c6f8	Quality Assurance	Noida
bc05441a-3d34-4aad-b835-441a613695c5	Legal	Mumbai
10656cc7-25fb-46bb-9b72-01c2640df300	Procurement	Ahmedabad
e2b6a59c-a5d6-4b70-8f51-a58d24db037b	Business Intelligence	Pune
92571626-3ae0-4a96-9a07-8d5284da185c	Data Analytics	Chennai
0d5054c9-6f38-4bd1-b060-c593850798b2	Cloud Infrastructure	Bangalore
6d698cbd-bc43-4745-91a3-b2d9a3b16503	DevOps	Hyderabad
7a8bda2a-3b7e-43e1-b70a-93946fa342d9	Technical Support	Delhi
d7774ff1-6683-467b-a2ee-5db8fe3a3cc5	Administration	Jaipur
24f90ede-c09c-47c0-8df2-ea9c6a6e3f09	Compliance	Mumbai
08f8c304-ae3d-403b-83e7-7adf1342dff5	Training	Kochi
85cb4346-cab9-4942-a725-85e89880d977	Internal Audit	Pune
bc91fd8a-1024-4623-9883-57f3fc302f6d	Public Relations	Chandigarh
3c39cd9b-2aff-4cb6-aa41-aa3354e5f792	Corporate Strategy	Bangalore
e57dd4dc-72a6-4fdc-9a8a-44d8eba3530b	AI Research	Chennai
2348c417-f541-46f5-be49-076bf0961065	Machine Learning	Hyderabad
a415c6a4-830d-4e21-b144-ff761cd1a0bc	Network Security	Noida
ecd44f2e-d59d-41ef-9c66-e6afafa0ab7b	Software Development	Bangalore
fc2d85a6-52bd-422e-9748-389a656ff620	Mobile Development	Pune
b968476f-41a1-4777-8e62-197695614eb2	UI UX Design	Mumbai
cc7eedce-e19d-498a-ae9f-dccdd286539e	Content Management	Delhi
3eb00954-ea1c-4c4e-96d1-b3d22d9e4b2e	SEO Optimization	Kolkata
8424e704-cbef-4e87-afbc-9710a0abd7d9	Digital Marketing	Hyderabad
6de28f0f-dbaf-40cf-bbe9-3b1c8dafcf91	Performance Testing	Chennai
ad9f8806-3992-4e3c-9c0b-7f076e1f23d0	Database Administration	Bangalore
1b5a404d-a943-4914-b9f3-d1dd796ed2f0	Information Security	Noida
e8437078-6d87-43ea-a766-d56d50e409ab	Infrastructure Management	Pune
5a05cd50-12e0-4c7b-b20e-a8c453b77a62	Business Development	Ahmedabad
abee0589-c57e-4539-8e88-454f1bdfc143	Customer Success	Mumbai
8c2db1aa-1cfd-4e73-9f0f-3e39852319e1	Vendor Management	Jaipur
c6a9e1fe-c991-4723-afa9-cdf579c290dd	Payroll	Delhi
d4b88030-547f-4864-8fce-6174d92df78e	Recruitment	Bangalore
8800bf34-96bf-4db8-b9a3-1b2fd9037046	Employee Relations	Kochi
115a5341-38cf-43de-8e35-b2bdd6510b2c	Industrial Design	Chennai
cc8a9072-ade7-4190-9450-83a2c70da8ad	Data Engineering	Hyderabad
d5657f8a-e811-42d8-9049-dbb51fcb44c9	System Administration	Pune
6011abf3-29b1-43be-b2c0-4d0e269d6aa8	Risk Management	Mumbai
9923f327-8497-41af-b1d8-4e775236f253	Innovation Lab	Bangalore
39ffb179-c7fa-4680-b257-64246b14edfa	Automation	Chennai
a5b9d4fd-fcb7-4d8e-a8e6-ee425147471d	Embedded Systems	Hyderabad
8c3bddde-9d61-4650-862d-302ad1137d6f	Blockchain Development	Noida
636bfe44-6363-416a-8685-c39a861dd5f2	Cloud Security	Pune
f65fa915-7f7a-440a-8794-8dd2b4e65d99	IT Services	Delhi
39c38518-697f-4d3f-bf5e-0a2ee76e2ca6	Technical Writing	Kolkata
4bc99b00-09db-43e9-906c-1656b3c13d30	Research and Development	Chennai
07cec885-29ee-44d0-b831-cf7bb939dee1	Enterprise Solutions	Bangalore
3713c8ab-7fb3-405a-a97f-9d5753f15e3e	Application Support	Mumbai
e15b1aa9-68a0-4baf-88e6-fcd4c6ce66c9	Field Operations	Ahmedabad
6b5d0716-4420-4d60-93f7-11d8c6356f4f	Inventory Management	Pune
17bccc8d-7f50-4f38-8f74-7cfed1c96b5f	Supply Chain	Delhi
28602e4f-72ad-462b-8070-c678e317d72b	Accounts Payable	Mumbai
e3c58712-82ca-43ba-8f12-5cc1338c033b	Accounts Receivable	Chennai
5288e012-8c78-4845-98f5-7fd86c032190	Treasury	Bangalore
5f7addcd-fe79-41b1-96b1-36376c1e3b4b	Investor Relations	Hyderabad
6ccc057d-43d3-4534-ba6f-3fe20a8cb591	Facilities Management	Noida
b39f05a6-db0a-4061-8134-5af907b48978	Help Desk	Kolkata
7d2d884b-fc3e-4038-97ae-2d2adcb441c1	Data Science	Pune
65f9783e-7e1b-4eb6-bba3-31302d78b160	Security Operations	Chennai
684b9d96-aaec-4502-85b8-b9e366125f5f	Fraud Detection	Mumbai
56e40bd9-de45-450c-b4c8-302efb669fe4	Cloud Operations	Bangalore
5f9f1ef6-dda4-4e82-b523-016dfd8e0bd0	Site Reliability Engineering	Hyderabad
d1fc1eb5-706e-49a4-9194-4dfaf4d787c0	ERP Solutions	Pune
fb3c3e46-6064-4d04-8982-a5e6b9a28871	CRM Management	Delhi
c416f30b-92be-4f48-8769-6175601ee4eb	Media Relations	Mumbai
fb49e62d-86f2-41de-a8da-db3893b08c4c	Creative Services	Kolkata
98118119-903a-43cf-979e-220761c38a8c	Brand Management	Ahmedabad
f0f8d6db-dd46-4e14-aae4-af23df4f0099	E Commerce	Bangalore
223a5aaf-1005-4508-a93b-836ac23018de	Retail Operations	Chennai
283398a5-0315-4efe-9923-8aafc907d0be	Logistics	Pune
c3251e16-e700-42a4-83ba-7165688035ff	Telecommunications	Hyderabad
705efd69-3d70-4fbd-8d7b-54fe912047bf	Network Engineering	Noida
68a7aa97-9830-4d50-aef5-c2cb1c56399c	Ethical Hacking	Bangalore
90df3183-45d6-47ee-953d-78ce1ddbc1c1	Penetration Testing	Chennai
495bc012-d3eb-465c-b2dc-beef6d28ce34	Identity Management	Mumbai
ba5eec21-b978-4cd5-8f0f-febc7164e544	Platform Engineering	Hyderabad
c7514c62-cc52-4b84-a705-6e893ccb5c7f	Big Data	Pune
0f91c87f-4d0e-40e9-96d0-c5c48c4460de	IoT Solutions	Bangalore
293e3e9e-0e89-4257-9c55-78eaae900b29	AR VR Development	Chennai
bc748720-71bf-462e-8b3a-a6c539fbff7b	Game Development	Hyderabad
a1103c9c-10f7-4524-89a4-1b6581649791	Bioinformatics	Kochi
344468f5-ab1d-4211-a03d-f616055274ab	Healthcare IT	Delhi
72e9b5b9-d77f-45a4-99f3-15a3311e28ae	EdTech Solutions	Mumbai
fd803190-0893-4cb2-a2c8-7a9372d36c20	FinTech Solutions	Bangalore
d11375f9-cb63-421d-b030-8fc012f0d2f4	Legal Compliance	Noida
b555c594-f4e9-4b10-9b90-049cd737df54	Governance	Pune
c6fc9798-385d-48a4-8373-4dd3f47efc84	Sustainability	Chennai
bd1e2d8c-1704-44b4-9ee5-3650a270436a	Environmental Safety	Ahmedabad
fc975651-02f6-45ce-a808-47f7941a7fe2	Disaster Recovery	Hyderabad
246b3434-ddd9-46d5-9ea8-e497ec15cc2f	Business Continuity	Mumbai
035bf019-9a4b-4fdd-bc68-e72508c05af6	Knowledge Management	Delhi
5e7e1740-1bc5-41fb-94eb-6a382177228a	Analytics Operations	Bangalore
f5e105e1-7fce-4487-8723-2a17675465d7	Customer Experience	Kolkata
11e5db4e-b89f-4dc4-b104-36d0b1314097	Strategic Partnerships	Chennai
8d4d087a-74f0-412e-93b4-210140ebc2b1	test	test
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id, auth_role, email, name, password, phone, role, department_id) FROM stdin;
a56844d8-f824-4a5c-90a1-a024af504a92	ADMIN	admin@company.com	Admin	$2a$10$TPqVpR7hQmT78YT9H69MIOl/FkdU7N40rnq9I60LOo8S0jvJvW3zO	9999999999	Administrator	\N
bd54ae3b-0079-4826-87e6-829c61335945	EMPLOYEE	sunil.sarkar1@company.com	Sunil Sarkar	$2a$10$pIK8Tatk4C.JwVlBUez3FutgOObpJlbx3AWNhWNhWUtTqDIXJssPO	9810737044	HR Associate	f7920c71-0439-45d7-8b0c-63fe495600ba
8f19655f-cfde-44a2-960b-9d587aa83434	EMPLOYEE	dhruv.pathak2@company.com	Dhruv Pathak	$2a$10$.TVQQAynDJ/tZf7p2zZ/zOSSfwTBxAoymSaEZbLn.dk9Z/q0TJj9m	9560405306	Finance Executive	e87cf280-d837-4c07-8ea0-e716cc5382f9
e26eebc7-3ff2-46a7-82e9-cbfc845f1d3f	EMPLOYEE	simran.alva3@company.com	Simran Alva	$2a$10$rvuArJjqeT7mD5GQzrER2OccMz76XdPD0S8X4SDZzQ/OhKZE1N7Zu	9810119451	Creative Lead	45349f69-1dd1-4d4f-92e3-ea1a1690ed30
dc3eaa07-9218-44f8-9d0b-f7ccd850702b	EMPLOYEE	neha.banerjee4@company.com	Neha Banerjee	$2a$10$vKPuX5t3pWJjuNId22Eige9lGQG3G43MFvt5HzHOa5gmS6j3rxe7S	9940225472	Account Manager	a972f9e6-a3ad-46cf-b5e2-08207981c7c1
20140223-0be0-43cd-a222-574d64f43a45	EMPLOYEE	simran.bose5@company.com	Simran Bose	$2a$10$s.7.//jkFtU343H1Wi/IRuyINiP4.I1ein6C0It4TqZAUMx5RN4Ym	9830709917	Operations Specialist	01d77f8b-0ae9-4dc2-b9f1-3a76c1258be6
b0195f5b-930a-40ce-8c47-1a5aba5be7f8	EMPLOYEE	kavya.mehta6@company.com	Kavya Mehta	$2a$10$cjISQhsG07cetQR2TStKgOyC8O4ujCqRWMT4XOXCUhzNVyYtUvYde	9844662600	Technical Support Engineer	d1190bed-8c0f-44b6-b598-07a8f27696ed
1c4a7cf8-bb82-41b9-8d9a-1b94b87d748a	EMPLOYEE	rajat.mukherjee7@company.com	Rajat Mukherjee	$2a$10$CO5Rs19ibqni93yK0zp3t.BrQ6vzyEnhHU42Ro9F.zvouXeWi.pWi	8800154772	Research Analyst	601ff48e-28f3-4474-a03f-17484bf999ca
1c333163-92ab-4eb7-bc4a-de1fa0201a3e	EMPLOYEE	vivaan.tiwari8@company.com	Vivaan Tiwari	$2a$10$d9JUNEYVBbXGBAom6NTtteJjmiC474TlE8hIN5NMZFfz8jGv5nb9m	9844309550	Associate Product Manager	798b102b-5d3c-4f53-a91e-01ccac22db08
38f6fdeb-abf0-40c3-9cc3-c5bbc0737057	EMPLOYEE	nikhil.menon9@company.com	Nikhil Menon	$2a$10$6s3wPTNReQ4A8D383wSeVes6hjkpPf5L/KyDQtkt81NKEPO4DNShS	9790381874	Penetration Tester	e6d41911-5701-4367-b800-c71a52dd600d
e15d3350-e13f-4c2a-8bfc-da1f052bdca9	EMPLOYEE	ira.bose10@company.com	Ira Bose	$2a$10$oy.bimdWTadxCNGJjN4wx.k/wSmABCZ0ZC0y93vvPhJSRy8UIlxiu	9790531916	QA Manager	9d30a54f-92ab-4ba7-a1d0-cf7bf0b2c6f8
d2adf2a6-fc55-433e-8915-babb6f35f7d3	EMPLOYEE	riya.mishra11@company.com	Riya Mishra	$2a$10$zc9wBGudvzlGMzGJrN50UOVv5M0ajqU.HGnS3eRgF3UI.mcuzZysG	9819109642	Legal Assistant	bc05441a-3d34-4aad-b835-441a613695c5
323fe9eb-f294-4fd9-9c6d-449dc740b546	EMPLOYEE	riddhima.pai12@company.com	Riddhima Pai	$2a$10$zJZS6TLc7ogyfhsy3O32uOhU6Nh9V1POeaqXrlaNDX./xJXmuG50e	9830397378	Procurement Specialist	10656cc7-25fb-46bb-9b72-01c2640df300
3ae9d8af-de52-4cf7-b838-92b62b7f67ab	EMPLOYEE	ira.banerjee13@company.com	Ira Banerjee	$2a$10$kaW/JPcHInq0Q/Gi2jtJUeFpkS6HvPdeRYUB7K0kS1v/meXc01fsa	9884418143	BI Manager	e2b6a59c-a5d6-4b70-8f51-a58d24db037b
dfc1b79a-5819-43c0-8e8e-6bf87634f8d7	EMPLOYEE	rahul.tiwari14@company.com	Rahul Tiwari	$2a$10$WoZ8Htb7EH.1IBnAAb/5auJ3SJ5TfbgUrzJAMg8grIV8VtoUIsOzG	9819235229	Data Analyst	92571626-3ae0-4a96-9a07-8d5284da185c
1bd32f99-4a43-48a5-8f84-ec29735e7bd3	EMPLOYEE	aarti.choudhury15@company.com	Aarti Choudhury	$2a$10$IjJQ7I1EQZqGtKKTBvVu0u0/t270h5vQQI3WHolM82QaCZ7M6qjzq	9790890956	Systems Engineer	0d5054c9-6f38-4bd1-b060-c593850798b2
60113d20-53d4-4a24-844f-eb0d9f8df303	EMPLOYEE	vivaan.choudhury16@company.com	Vivaan Choudhury	$2a$10$zvXRAm8WWUn6JFw766pop.XNdhcdVnsE41H4TgJlwB85qG9R4ZrPu	9948505072	DevOps Engineer	6d698cbd-bc43-4745-91a3-b2d9a3b16503
92101c4a-49ae-4176-8c11-0f8b8f276b00	EMPLOYEE	harsh.sharma17@company.com	Harsh Sharma	$2a$10$2ogrWWtNvUlhbpiJE7eX6OcHg4GQISTdwmAM6aZNgpG0h/3E7UGyG	9811580691	Desktop Support Engineer	7a8bda2a-3b7e-43e1-b70a-93946fa342d9
362adff8-ebb0-4383-9037-0fe9502729fd	EMPLOYEE	sanjay.prabhu18@company.com	Sanjay Prabhu	$2a$10$ciYLPOK/2v.SvD/do9vdl.cg5144Qr/UzO3vUTc.FIzYVO/USjJYS	9790285885	Admin Coordinator	d7774ff1-6683-467b-a2ee-5db8fe3a3cc5
e915a1ad-9f11-44a9-9f2f-c64c9382f035	EMPLOYEE	nitin.prabhu19@company.com	Nitin Prabhu	$2a$10$bn4FV2GOoCtHHbgltQgMMuF1V6fB4p/3ZpCgRhsgPKEooCkd4u54q	9899248387	Risk Compliance Lead	24f90ede-c09c-47c0-8df2-ea9c6a6e3f09
b07e0414-6aab-4099-9c6f-7903ee941938	EMPLOYEE	kiara.shenoy20@company.com	Kiara Shenoy	$2a$10$Hsig4F.7ADX8ERvM2jg4Se7eUVLHnR3wqP9lP8MBhrN5SnibuzxDa	9848393391	Training Manager	08f8c304-ae3d-403b-83e7-7adf1342dff5
6849eddb-6612-42d2-8a46-b7b07fd84322	EMPLOYEE	diya.dwivedi21@company.com	Diya Dwivedi	$2a$10$qXTzg3Pv5u9AGYZt5HDm5estYHr4p66BWBLXL0gb86uYXUoX2LLnK	9840201566	Audit Manager	85cb4346-cab9-4942-a725-85e89880d977
3241c4c5-8bb5-4f60-ad14-d581b6a32173	EMPLOYEE	aditya.dwivedi22@company.com	Aditya Dwivedi	$2a$10$kjMtr9CAgCj.2813MAB0o.m1Z3OVS7i4874Wk95cR/sL34IX8VRKW	9890283168	Communications Lead	bc91fd8a-1024-4623-9883-57f3fc302f6d
6814262e-5610-46fe-a1d3-94c2e9282e11	EMPLOYEE	reyansh.chatterjee23@company.com	Reyansh Chatterjee	$2a$10$65DKdgwjIEjqMLrp5nifF.N3/vDznhb4zPQUYabDJor2SuwGfyP6i	9560502986	Strategy Analyst	3c39cd9b-2aff-4cb6-aa41-aa3354e5f792
7d288e8d-9dc5-4f3f-858d-db4aad87369e	EMPLOYEE	geeta.mehta24@company.com	Geeta Mehta	$2a$10$CrmAqf2ss1dNoAhuuu4Ms.wbSIQeWxK5niNr/7K7bVJUt4dRR3EL.	9841674765	AI Research Lead	e57dd4dc-72a6-4fdc-9a8a-44d8eba3530b
bdd60ba5-ad8d-41ad-8bc1-aff78df83b5d	EMPLOYEE	reyansh.deshpande25@company.com	Reyansh Deshpande	$2a$10$/OMYfEBacJFrAytarjK1Z.rNbS.e/Vk0KUGTFQkpHIVarI8eYVfEu	9890277392	Senior ML Engineer	2348c417-f541-46f5-be49-076bf0961065
84b02027-099b-4c79-997f-67fc2bd4817f	EMPLOYEE	rajesh.prabhu26@company.com	Rajesh Prabhu	$2a$10$hYaeUM5mOCw9t/9FTbsGKeU2kHE2xugiaPfq34wUCz7SZ4iEKqSw6	9810225324	Security Architect	a415c6a4-830d-4e21-b144-ff761cd1a0bc
f534f955-b651-4f32-92ec-1ee6d1b7f526	EMPLOYEE	ishaan.mehta27@company.com	Ishaan Mehta	$2a$10$R0Rufje8UwMC5q9kPULcsOvBOgU7V.BRbPe8FINepEn.3.muhDPt2	9823866171	Software Architect	ecd44f2e-d59d-41ef-9c66-e6afafa0ab7b
23caa824-53c4-4bf3-ae00-3fdcf131564e	EMPLOYEE	vivaan.naidu28@company.com	Vivaan Naidu	$2a$10$Qk2VP5GAaNaw2/6PSUJ8MuPbiNz6u9HQXhe6Pc5ToSWe/z4K4/cZW	9989992050	Mobile Lead	fc2d85a6-52bd-422e-9748-389a656ff620
0286429c-0226-4df1-a59a-e70df452c127	EMPLOYEE	geeta.kulkarni29@company.com	Geeta Kulkarni	$2a$10$R07qSR72J29uXCpDsEQJnumu71MVX4wKdrxMFQyO1G6hNCwt.vgVi	9810965959	UI UX Designer	b968476f-41a1-4777-8e62-197695614eb2
22a4d04e-db72-482f-af70-fd78629e38c4	EMPLOYEE	abhishek.mukherjee30@company.com	Abhishek Mukherjee	$2a$10$4EH1QPx9RtWdrqZIRzpSjOh5FDUWsxOmUgayFNdspcQYxzr95Hrla	9940298109	Creative Director	cc7eedce-e19d-498a-ae9f-dccdd286539e
efec79a7-97bc-44b5-bb3e-b466315aa6bd	EMPLOYEE	ayush.alva31@company.com	Ayush Alva	$2a$10$DxecMEDfk2VcNkhakTtltuM9/j206ge0S/.o2OuUzEbPeDKxhj39S	9899727212	SEO Manager	3eb00954-ea1c-4c4e-96d1-b3d22d9e4b2e
c4ce2848-06b2-49ec-b52e-c6ab9b8186c4	EMPLOYEE	gaurav.kumar32@company.com	Gaurav Kumar	$2a$10$THPZvIfVg9dM730NDCaeVORvmZXIi6DvSpIptLUarDVZwOy.T55wO	9848468324	Digital Marketer	8424e704-cbef-4e87-afbc-9710a0abd7d9
bc80b5f9-55ef-454a-af1c-7e6c0099b293	EMPLOYEE	samarth.chaturvedi33@company.com	Samarth Chaturvedi	$2a$10$nsCzu/hIsbnvIDVrO9vFhu/VqD0wXN8llwapevu0B/U6rmkGYcGOC	9841885214	Performance Test Engineer	6de28f0f-dbaf-40cf-bbe9-3b1c8dafcf91
b693c483-98d4-4eca-ae37-ae8fdb9e73c2	EMPLOYEE	sara.mishra34@company.com	Sara Mishra	$2a$10$BMZR8dqZE43XXrkrYv.sROH8ZdUhceiAedip1RlvS0GrOIvaW8Rvi	9841755002	DBA	ad9f8806-3992-4e3c-9c0b-7f076e1f23d0
813f103e-3302-446d-966a-a0a1b1921b32	EMPLOYEE	vijay.das35@company.com	Vijay Das	$2a$10$/yOO.jXHQCgsWDAA5KuyGOPNMoh49A0j8c25pSOTmvbaAC6M8fiYK	9820776203	Infosec Director	1b5a404d-a943-4914-b9f3-d1dd796ed2f0
ba591bbb-63cc-4243-abf6-c4b06c852f1b	EMPLOYEE	reyansh.trivedi36@company.com	Reyansh Trivedi	$2a$10$EFwTV2iPaLwG19tJ8B28ne2hRO9yq.hBvQhw4XumaYxUpWaFFsGoS	9884392477	IT Manager	e8437078-6d87-43ea-a766-d56d50e409ab
f8a610dc-fce3-4ed1-9c37-ec33297187d4	EMPLOYEE	ayush.dubey37@company.com	Ayush Dubey	$2a$10$9nCnC3w43PxSu5t667Tww.6qmc8TscwpIRhQxNFekuTEh5YPl3pbG	9880579966	VP of Business Development	5a05cd50-12e0-4c7b-b20e-a8c453b77a62
19a1ea92-5e72-4b34-98f7-70ce1a16b885	EMPLOYEE	sunil.sharma38@company.com	Sunil Sharma	$2a$10$eZaxLxSycsYIek./8PdJD.XGEqj.4SjETwbINlplYHeepP2QxpnZa	9848827782	Director of Success	abee0589-c57e-4539-8e88-454f1bdfc143
bbab2ded-8e78-4864-97da-d454e26644de	EMPLOYEE	dhruv.iyer39@company.com	Dhruv Iyer	$2a$10$hdXEIbeZpQws/YZupd4M5.PZY009lbCPNsX6gKB7zuGdvzNqNfX/a	9433209639	Sourcing Manager	8c2db1aa-1cfd-4e73-9f0f-3e39852319e1
b3a851b1-3c6f-4778-9914-e8ceda829279	EMPLOYEE	sunita.prabhu40@company.com	Sunita Prabhu	$2a$10$dsFxggPt/VVGwuHKsJxNYumOntVkcfUgo0JlHzwowAfnjqR7aRd6m	9940982129	Payroll Specialist	c6a9e1fe-c991-4723-afa9-cdf579c290dd
fe81b2cb-6107-4432-b086-210114759152	EMPLOYEE	pooja.das41@company.com	Pooja Das	$2a$10$R/75Ac0WxyfCDENOrcqO9OFS/ahl.v9j5ovOh/ebSMOb9QSuaevqK	9890912358	Recruiter	d4b88030-547f-4864-8fce-6174d92df78e
156c5bb1-d4f7-4b83-a5ed-35bff8f61119	EMPLOYEE	rajesh.mallya42@company.com	Rajesh Mallya	$2a$10$pjTuuN5Svh2B5OywdAdbK.j.//haoxcRTVdmptntmcL2AlizI30OC	9840144029	ER Specialist	8800bf34-96bf-4db8-b9a3-1b2fd9037046
05b587c4-b14d-4bd9-8b0a-f30d91131014	EMPLOYEE	varun.shah43@company.com	Varun Shah	$2a$10$NdzkwNyVNCwhqWl6g5Al0ep1RL9W8ngqAGicAb50MspVtOsPc3l5m	9890989289	Design Engineer	115a5341-38cf-43de-8e35-b2bdd6510b2c
dfbf99b1-4618-4d20-9340-1149c566b99a	EMPLOYEE	saanvi.dwivedi44@company.com	Saanvi Dwivedi	$2a$10$7GMJFysgO4CVO4gk1fOjeu.Jh2DCXBLlPG3q32r2jYCYCUC6WA4qO	9980284953	Data Pipeline Architect	cc8a9072-ade7-4190-9450-83a2c70da8ad
8a47e03c-c60d-47c0-b4c7-bd0683e60a8e	EMPLOYEE	rudrud.reddy45@company.com	Rudrud Reddy	$2a$10$JfZ3D6iyPLNqwZIa2jrLOen9teOswcHYn9KHZwuqtPWvx.62dS22y	9433138340	IT Administrator	d5657f8a-e811-42d8-9049-dbb51fcb44c9
bfd8cce7-5622-4ce1-8213-1cbf857cef9a	EMPLOYEE	zara.chatterjee47@company.com	Zara Chatterjee	$2a$10$i56ToQbR.9QJlzaPX3jbVu0K5C2RHR.jpvd8va.DDWLJIO6o09pDS	9900453986	Innovation Manager	9923f327-8497-41af-b1d8-4e775236f253
9416d6e4-0216-46ab-9646-fc4e99fc3fb2	EMPLOYEE	prisha.shukla48@company.com	Prisha Shukla	$2a$10$lhZ2P4MdJCayFdhFRMR9QuS2bRPC//fHhX3MruJ1BaHRgIYy0kFcm	9812444160	Automation Engineer	39ffb179-c7fa-4680-b257-64246b14edfa
3fae858f-5e80-4a0f-b436-a70ebee87f82	EMPLOYEE	sneha.joshi49@company.com	Sneha Joshi	$2a$10$s2ptr/ndwWv3G/nBfnxA.e0OjfzADhm/iT0kF9dhl4Uk5SeQG/8/W	9823354643	Hardware Specialist	a5b9d4fd-fcb7-4d8e-a8e6-ee425147471d
96a183a3-abd8-4835-81b8-d936077eb9de	EMPLOYEE	alok.pai50@company.com	Alok Pai	$2a$10$sJTjXBZ8RSz/dGW0jwwMN.FQ7fZwUKnQL1svlTwxW8UxrbMgh5Nyy	9822476454	Blockchain Developer	8c3bddde-9d61-4650-862d-302ad1137d6f
7229fefa-b8b0-44a5-8d5f-17332fc46f60	EMPLOYEE	vivek.shah51@company.com	Vivek Shah	$2a$10$0msyTwm8O6wNOj7zWa4N9eebjuGo3kAUsVpgxrO3QNoL1XsowaszK	9820815782	Cloud Security Architect	636bfe44-6363-416a-8685-c39a861dd5f2
9b32988f-d614-48de-ba3b-10f0980612b3	EMPLOYEE	riya.reddy52@company.com	Riya Reddy	$2a$10$OjqBN1GqrSoGlVKCtnejWeb0XGce.sOj9dV.9dTvy9.XeHQrhSG7.	9848882189	IT Consultant	f65fa915-7f7a-440a-8794-8dd2b4e65d99
df5b9db6-a024-422d-9924-73a3541d9320	EMPLOYEE	kiara.rai53@company.com	Kiara Rai	$2a$10$VFfTUPsjVeJHxAq/QujhzuwUYdfpphVmjmA.QIfydHn8z4fQAbCvi	9844372183	Technical Editor	39c38518-697f-4d3f-bf5e-0a2ee76e2ca6
0c4da7dc-ea02-4cc3-8f94-c531c6a84ce7	EMPLOYEE	rahul.bajpai54@company.com	Rahul Bajpai	$2a$10$Zus37.IPkQTPtrrOVazJoeSIXsnxwswQ/qdzGww1QKLG.3ceUDpne	9560970769	R&D Specialist	4bc99b00-09db-43e9-906c-1656b3c13d30
dcefb809-454d-41f8-9b30-47158aff11c6	EMPLOYEE	vivaan.roy55@company.com	Vivaan Roy	$2a$10$jssLYrNIMDpv0OZxuopRLuIfQhg.uWwfK6uNcF8MXQ12e.82RmQiu	9560322706	Solutions Lead	07cec885-29ee-44d0-b831-cf7bb939dee1
477169b2-6ac9-45c2-b0d5-4dc6f745debc	EMPLOYEE	vihaan.iyengar56@company.com	Vihaan Iyengar	$2a$10$pCk8rkd3IuPPIyIbtlSL5.n5puDlxAdHMWOKUsDkVpDYKXyiBmjrm	9890875587	App Support Engineer	3713c8ab-7fb3-405a-a97f-9d5753f15e3e
245a61e0-5719-4d49-8cda-2032de99d2e2	EMPLOYEE	dhruv.chaturvedi57@company.com	Dhruv Chaturvedi	$2a$10$1dRaTfU8oNVZkrzfijOzu.EGjfy6vjW3Dthaz9mQ9GHoelqeUx.Ty	9890136801	Field Engineer	e15b1aa9-68a0-4baf-88e6-fcd4c6ce66c9
a99372f9-c468-4da2-ae7f-cf2973348937	EMPLOYEE	shaurya.sen58@company.com	Shaurya Sen	$2a$10$c.x5Uwngl2ngPdkF/3u7hOQc0.CrhjYzhQhmAlBqXeD2K5A0G4B9i	9840205634	Logistics Analyst	6b5d0716-4420-4d60-93f7-11d8c6356f4f
fb7a282c-f20b-4d2b-925c-57e3e052d916	EMPLOYEE	yash.mehta59@company.com	Yash Mehta	$2a$10$boMzd9rjoOXqLyFO8P5/3eUn/xeACkoQiuPwzW5VwfDpGFXzz3vTi	9880199927	Supply Chain Manager	17bccc8d-7f50-4f38-8f74-7cfed1c96b5f
6ec1e2db-4406-4af3-b7c8-856a24f7b2eb	EMPLOYEE	krishna.pathak60@company.com	Krishna Pathak	$2a$10$mtPdTFSss/os8tkfYvpu8OLLmHjw07RhUhCzquKiPeEN2vUThs3OW	9884714298	AP Manager	28602e4f-72ad-462b-8070-c678e317d72b
b35fdcbd-d576-4144-900d-c141bba5f406	EMPLOYEE	sara.prabhu61@company.com	Sara Prabhu	$2a$10$aPrcSTdEyJqUd/zDJpgYQuNnsyXYyVTMStvzklo5FxQrLtJGNqYZG	9560653828	AR Clerk	e3c58712-82ca-43ba-8f12-5cc1338c033b
9c12a0d2-9676-445e-87a1-2a13e0a3bd82	EMPLOYEE	abhishek.joshi62@company.com	Abhishek Joshi	$2a$10$mJc9KUYEOSEZbMC0qeJQVug0.LZkseqUiRly5bUFMlE3xbnhd.Cm6	9885555189	Treasury Accountant	5288e012-8c78-4845-98f5-7fd86c032190
99b83956-5f5a-4cc9-b0f0-2ff2ca152407	EMPLOYEE	anil.prabhu63@company.com	Anil Prabhu	$2a$10$23QiPE51l4yFZdqExrUus.krhLPL6bFnDGrRxUigejsRYlAZG6tKG	9831804139	IR Analyst	5f7addcd-fe79-41b1-96b1-36376c1e3b4b
8cbd49c3-0ef3-4530-91b1-df9387bd9b10	EMPLOYEE	anita.rao64@company.com	Anita Rao	$2a$10$teSupeOk.uHj2SIKwwrKjOZei6wnv//lWQz.Uhpu.xOvV3mtNZPG.	9822623702	Facilities Coordinator	6ccc057d-43d3-4534-ba6f-3fe20a8cb591
e1f5b9d3-1231-47b2-b3d8-91412bb881d7	EMPLOYEE	shaurya.pandey65@company.com	Shaurya Pandey	$2a$10$Ajqv1r2.5nqc5D2j4sPWZezOXj3YzT7QzREg3LRkDrsGYJAh..Y82	9811807839	Help Desk Manager	b39f05a6-db0a-4061-8134-5af907b48978
ddb0861f-8ce9-4b27-a042-ea5a85892ebb	EMPLOYEE	jyoti.dwivedi66@company.com	Jyoti Dwivedi	$2a$10$iobCMprdMd8/eWWsbep6Qujm3.Gdwvfy8jTIJtpJb2R6zIHaBCqo2	9848688147	Lead Data Scientist	7d2d884b-fc3e-4038-97ae-2d2adcb441c1
a558f550-051a-48ec-97e0-e78fc6396b76	EMPLOYEE	reyansh.shetty67@company.com	Reyansh Shetty	$2a$10$MyKTfrPZtgyJX0CXNUAO/uxeDx..Mi1rrRYUnmFBl8Drc/CPkvZWS	9922551363	SOC Manager	65f9783e-7e1b-4eb6-bba3-31302d78b160
d767be18-fa52-4b78-a4c1-ebf0c4d487bf	EMPLOYEE	ayaan.prabhu68@company.com	Ayaan Prabhu	$2a$10$0AqYVwzepYaLkvkyFxCUG.ps4r73uCu5xevvDvIZrQ66Sxp/c8zqG	9841373110	Fraud Detection Manager	684b9d96-aaec-4502-85b8-b9e366125f5f
614ea726-de16-4f30-90ca-af5441879e95	EMPLOYEE	dev.singh69@company.com	Dev Singh	$2a$10$fWqT8CjUdeXe/vw54ILl6.ppKbFUZ9/ex/5jbkaTzFBw63HAD/1wy	9812584989	Cloud Ops Analyst	56e40bd9-de45-450c-b4c8-302efb669fe4
6ba9fed2-e362-4ea1-a3b4-b2bb6f7c0236	EMPLOYEE	nikhil.iyer70@company.com	Nikhil Iyer	$2a$10$R83DJiOvF4p3ZZ2edHwFb.00qKpBwcWHxPJUWgjUlxVGqYcShuAUK	9922452380	SRE	5f9f1ef6-dda4-4e82-b523-016dfd8e0bd0
9bd107b0-6c24-42ee-a42c-2a88e0218a84	EMPLOYEE	saurabh.reddy71@company.com	Saurabh Reddy	$2a$10$vhgFEcYrvexR1WnVfa1U/eKk9zG99NblxlrTBAwVl97IX6XSQgEbC	9176204913	ERP Architect	d1fc1eb5-706e-49a4-9194-4dfaf4d787c0
9224a671-b557-4784-adc6-a128bb2d8145	EMPLOYEE	nitin.shah72@company.com	Nitin Shah	$2a$10$PquZj3H67cmgVeGaeIMq0.tKAQ5oIvfxAUGmRfyVelzjdm6sv.1Lm	9840886735	CRM Manager	fb3c3e46-6064-4d04-8982-a5e6b9a28871
f3a038f1-bf3e-429e-b258-48d19ae2b347	EMPLOYEE	sanjay.choudhury73@company.com	Sanjay Choudhury	$2a$10$UtKXcGr93X6PhSPgG0IE8uvLGPxzmW0.Cd/0GU1zRk3bFoLDR84lq	9989545604	Press Officer	c416f30b-92be-4f48-8769-6175601ee4eb
1ef8e7bd-6428-4c2c-8ba4-aa5a04c07b8d	EMPLOYEE	rajat.bose74@company.com	Rajat Bose	$2a$10$YwPKXkawNg/9/KPJLbnbiuJlMGfb5mECLfYrUYZZWsGUp8iNWU79q	9831673578	Creative Manager	fb49e62d-86f2-41de-a8da-db3893b08c4c
a2545920-c25b-4cb3-9e20-bfb45c2fb807	EMPLOYEE	kiran.shenoy75@company.com	Kiran Shenoy	$2a$10$yQ8ArCF11W3zO9lnSaFg9eRCuXx1FQ3nAOQP6Cz07dvFoc31t17va	9560494931	Brand Associate	98118119-903a-43cf-979e-220761c38a8c
935f7148-bdb0-40a2-b8ff-049597d91171	EMPLOYEE	sara.mehta76@company.com	Sara Mehta	$2a$10$CzVMkWivbgbsicG7zxAUMOODdaIhtKeOmuItnCrVtUsSstlZCuoWS	9433847743	E-commerce Specialist	f0f8d6db-dd46-4e14-aae4-af23df4f0099
37f2ef48-c795-467b-a1d3-c00752724ff1	EMPLOYEE	sneha.joshi77@company.com	Sneha Joshi	$2a$10$GDOK.fTYkCOGlQOyqFTXd.uYfTXMuFTKns5K19YvoOLtDchxtbDOe	9841506936	Retail Specialist	223a5aaf-1005-4508-a93b-836ac23018de
a627b467-5b04-4254-ada5-2acfbbb1453c	EMPLOYEE	sneha.rai78@company.com	Sneha Rai	$2a$10$5ALt8wCuouhGGK08qUcOhOE9KknnQ3aQ/d6CYDRacDU93MZj/gUx.	9820825212	Logistics Coordinator	283398a5-0315-4efe-9923-8aafc907d0be
9ec40c4e-6439-4a4d-8a20-9a5f0b2f6615	EMPLOYEE	vijay.hegde79@company.com	Vijay Hegde	$2a$10$jbKOfO9Ku4SkISHSty30y.EBHqnnH2oNPcrDLFXhs0i5VScgrlHbK	9910990727	Telecom Engineer	c3251e16-e700-42a4-83ba-7165688035ff
1893aafa-15c1-4be0-a8f5-8d00cee5c02e	EMPLOYEE	nisha.mukherjee80@company.com	Nisha Mukherjee	$2a$10$rXVy2D5oWKFNpfhTd88IGeseYSnvudIDZPGhWx4UX8lV1/Anu8lUW	9433635272	Network Engineer	705efd69-3d70-4fbd-8d7b-54fe912047bf
e7a241b9-e9b1-42d6-bb1d-e8e60592cae6	EMPLOYEE	harsh.banerjee81@company.com	Harsh Banerjee	$2a$10$W26ZooG0JeKBZ1j0wlVwPuBOSv4S/FarzDMin7aKPgH5fXEr7Opoe	9948368912	Red Team Lead	68a7aa97-9830-4d50-aef5-c2cb1c56399c
7f12b670-63cd-458b-a9ff-b87ff90d47c9	EMPLOYEE	priya.mukherjee82@company.com	Priya Mukherjee	$2a$10$/tAmJNAUEcS52MSU0ZU9aueltBOs9RaU5PV./hyiFuseoxJwvArr6	9890960293	Pentester	90df3183-45d6-47ee-953d-78ce1ddbc1c1
352be238-6bc3-42cd-980b-d1339deb3735	EMPLOYEE	reyansh.iyengar83@company.com	Reyansh Iyengar	$2a$10$0d9EiYjFuHelbLlnTceh/.z4Z8Osp.AGP3IRI1n5EkAqPshlOi7Oy	8800491215	IAM Specialist	495bc012-d3eb-465c-b2dc-beef6d28ce34
4ab8d962-afd6-4c20-ba1e-b2d646288d3e	EMPLOYEE	reyansh.mehta84@company.com	Reyansh Mehta	$2a$10$S55PhXx9Mny933PuSCReLuMwhre12ZvLmBeTv8hcCSlJ7rWJnVzIW	9830750927	Platform Architect	ba5eec21-b978-4cd5-8f0f-febc7164e544
5ab56990-ebe4-4cd7-aca1-7ba391238e8d	EMPLOYEE	sunita.singh85@company.com	Sunita Singh	$2a$10$aS6f1Vrr0AlSPmAHCNLoV.iZ5qAwoB0Rw0lbgD1bs54z3PczDP7gm	9880254023	Big Data Engineer	c7514c62-cc52-4b84-a705-6e893ccb5c7f
897f279d-9ba4-40c8-8ac6-e6df2ddc1997	EMPLOYEE	ishaan.iyengar86@company.com	Ishaan Iyengar	$2a$10$zTI4d71N3FpMjWDNXvd87.y8A20BlEKxbxANXKvp0/FX5vL1Z2t32	9860816484	IoT Engineer	0f91c87f-4d0e-40e9-96d0-c5c48c4460de
3c3301cd-b2c7-4fcb-8aa4-dcd9814894cc	EMPLOYEE	harsh.shetty87@company.com	Harsh Shetty	$2a$10$Y6n9v0PlvM4dfkBGEn.0Hep5vrG4E4/dpeh6BWzzMYe4evnAY.1Sq	9841819462	AR/VR Architect	293e3e9e-0e89-4257-9c55-78eaae900b29
5a382c38-9bd8-453f-b963-68ff721bb6f3	EMPLOYEE	anjali.mukherjee88@company.com	Anjali Mukherjee	$2a$10$F9aGL5NImMUcdql2XnmYV.INPXwXSW/39tMi/cAygeR5agSnyyvOq	9860706646	Unity/Unreal Developer	bc748720-71bf-462e-8b3a-a6c539fbff7b
d23b77d4-12e0-46c1-9145-5363c6f13b61	EMPLOYEE	karan.verma89@company.com	Karan Verma	$2a$10$1kdhEpCq9wDol8JQVKq8y.30odPhr3uOBvYteNC82luDCa7uWqKmO	9003103864	Bioinformatics Lead	a1103c9c-10f7-4524-89a4-1b6581649791
3be34d30-b61f-478b-9776-4c187c7a9d9b	EMPLOYEE	karan.roy90@company.com	Karan Roy	$2a$10$AYbrcPrV4VFIZJ2Hd4b8guDSSDzDZtw9J7mJbR484Oey71wIsBaaO	9841350386	Health Informatics Specialist	344468f5-ab1d-4211-a03d-f616055274ab
1c57e000-a9c6-4f4c-a5a3-82ec8ba25372	EMPLOYEE	pranav.mallya91@company.com	Pranav Mallya	$2a$10$Iyv3YQBbuFtO0CJKmWYQz.Z.uNHUNfXdWcMl4ePrHx8Tl18UpQeaO	9444419979	Instructional Designer	72e9b5b9-d77f-45a4-99f3-15a3311e28ae
d572c3ef-073e-4647-bcd8-5e5590f8ab5e	EMPLOYEE	vivaan.sharma92@company.com	Vivaan Sharma	$2a$10$qC77kXE6NqgKZEkRaFBIaeVt4iMdCwttlNbQNQtpii68PgDsnanTW	9922242073	FinTech Product Manager	fd803190-0893-4cb2-a2c8-7a9372d36c20
228fd2da-385c-4ae5-a11e-54d3ad6c5da4	EMPLOYEE	suhana.das93@company.com	Suhana Das	$2a$10$Red016fjt1xOgMdQmGn.VOrNX7NC78soDvZpT.30Err2Z6LTzoxeC	9811977847	Legal Compliance Manager	d11375f9-cb63-421d-b030-8fc012f0d2f4
41e791d5-d0ce-40dc-aba6-1b898b54a54f	EMPLOYEE	vijay.shukla94@company.com	Vijay Shukla	$2a$10$yWVZogVa8ysT7qJF0UMboenpY.n3ne90zi5kjyPlWQcTQDPnqcftC	9910128565	Governance Analyst	b555c594-f4e9-4b10-9b90-049cd737df54
ecb417d2-2505-41ba-b2d9-f668a19d15a8	EMPLOYEE	anita.trivedi95@company.com	Anita Trivedi	$2a$10$xp4kb6Ya8PIwgSkthWenSOYMlIJLp6U1fLFJtS54cTWRgtu4aWndm	9810993548	Sustainability Analyst	c6fc9798-385d-48a4-8373-4dd3f47efc84
a4e6f9b2-e857-44b0-bb10-901588890329	EMPLOYEE	zara.sen96@company.com	Zara Sen	$2a$10$oVgqSaaaDIa.EJ/i8LNdFO0Rn5slLRuU5dQ9TgBq4G6qFhnMzchHe	9848616583	EHS Manager	bd1e2d8c-1704-44b4-9ee5-3650a270436a
2d65fd93-7518-4967-b5aa-5f3db425a6a4	EMPLOYEE	ishaan.patel97@company.com	Ishaan Patel	$2a$10$qTIOCCLDG9calu2ooWmBu.qS/Scpwy5xJniF8j/kv8DmW8xDLy6Rm	9819938321	DR Specialist	fc975651-02f6-45ce-a808-47f7941a7fe2
4b0014e2-937e-48ba-aedb-6df0cccaccf3	EMPLOYEE	kian.joshi98@company.com	Kian Joshi	$2a$10$Zxfrw97Ah8ZyzY9N9z37LOoizppac3tIARKcOo94X4krCQhMPBety	9176454850	BC Manager	246b3434-ddd9-46d5-9ea8-e497ec15cc2f
72ed92b3-151f-48a5-a3da-57c72ecedd52	EMPLOYEE	ayaan.shenoy99@company.com	Ayaan Shenoy	$2a$10$F/nxXTHXwxj9BzMJCbs/0u/nv/oBuF19P/gTFfmRMk2pxQuz/wney	9844410954	Knowledge Specialist	035bf019-9a4b-4fdd-bc68-e72508c05af6
d1caea7d-7fb3-4c5a-9c20-8774d1f60782	EMPLOYEE	aarav.patel46@company.com	Aarav Patel	$2a$10$UnSqz/aJfL11MotTZHK7BOdGML1fgWO3xv.MNFkfbFR7FB2mee3Ju	9840668655	Risk Manager	6011abf3-29b1-43be-b2c0-4d0e269d6aa8
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, deadline, project_name, status) FROM stdin;
\.


--
-- Data for Name: refresh_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_token (id, expiry_date, token, employee_id) FROM stdin;
19ad0ccb-ab72-4d13-a85d-8b4c3d6b20b3	2026-05-28 18:53:28.958	6827c410-a91d-4f0c-9748-bafcf3939b7a	d1caea7d-7fb3-4c5a-9c20-8774d1f60782
9c0c3672-70d5-444a-a78e-bbbca0df46ab	2026-05-28 18:53:36.818	54be5d58-935c-43d7-8d04-df692fee52e3	a56844d8-f824-4a5c-90a1-a024af504a92
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, description, status, title, employee_id, project_id) FROM stdin;
\.


--
-- Name: attendance_sessions attendance_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance_sessions
    ADD CONSTRAINT attendance_sessions_pkey PRIMARY KEY (id);


--
-- Name: attendances attendances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendances
    ADD CONSTRAINT attendances_pkey PRIMARY KEY (id);


--
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: refresh_token refresh_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT refresh_token_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: refresh_token uk8ytxm3c1p1ny08u073jn5wwv6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT uk8ytxm3c1p1ny08u073jn5wwv6 UNIQUE (employee_id);


--
-- Name: employees ukj9xgmd0ya5jmus09o0b8pqrpb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT ukj9xgmd0ya5jmus09o0b8pqrpb UNIQUE (email);


--
-- Name: refresh_token ukr4k4edos30bx9neoq81mdvwph; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT ukr4k4edos30bx9neoq81mdvwph UNIQUE (token);


--
-- Name: attendances fk2mia0pcnmy2nddwedvfrt0w08; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendances
    ADD CONSTRAINT fk2mia0pcnmy2nddwedvfrt0w08 FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- Name: employees fkgy4qe3dnqrm3ktd76sxp7n4c2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT fkgy4qe3dnqrm3ktd76sxp7n4c2 FOREIGN KEY (department_id) REFERENCES public.departments(id);


--
-- Name: tasks fkjc3xiile6e5jbtmywxw5vfm7f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fkjc3xiile6e5jbtmywxw5vfm7f FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- Name: attendance_sessions fkomqnfqbc5w7gldhk5eo6282br; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance_sessions
    ADD CONSTRAINT fkomqnfqbc5w7gldhk5eo6282br FOREIGN KEY (attendance_id) REFERENCES public.attendances(id);


--
-- Name: refresh_token fkph5tbg3ofbc6whxe6dhune294; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT fkph5tbg3ofbc6whxe6dhune294 FOREIGN KEY (employee_id) REFERENCES public.employees(id);


--
-- Name: tasks fksfhn82y57i3k9uxww1s007acc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fksfhn82y57i3k9uxww1s007acc FOREIGN KEY (project_id) REFERENCES public.projects(id);


--
-- PostgreSQL database dump complete
--

\unrestrict WWWbWrAhEuj1FV0heMLAEAbwdzog6IoKBDfphbkbfNzxqaBsNDjp42zIh7ZpRqY

