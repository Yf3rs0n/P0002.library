create database DB_LIBRARY
use DB_LIBRARY

create table author(
id int identity(1,1) primary key not null,
name varchar(150) not null,
bio varchar(250) null,
);

create table book(
id int identity(1,1) primary key not null,
title varchar(150) not null,
year int null,
genre varchar (150) null,
authors int foreign key references author(id)
);

insert into author (name,bio) values ('Miguel de Cervantes','Miguel de Cervantes Saavedra ​ fue un novelista, poeta, dramaturgo y soldado español.');
select * from author

insert into book(title,year,genre,authors) values ('Don Quijote de la Mancha​', 1605, 'Novela psicológica',1);
select * from book

