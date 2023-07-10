create database influencer_hub_database

create table users (
  id serial primary key,
  name text not null,
  email text not null unique,
  password text not null,
  authorized boolean not null
);

create table categories (
  id serial primary key,
  category text not null unique
);

create table influencers (
  id serial primary key,
  name text not null,
  email text unique,
  age integer,
  subscribers integer not null,
  at_channel text not null unique,
  platform text not null,
  id_user integer not null,
  id_category integer not null,
  foreign key (id_user) references users (id),
  foreign key (id_category) references categories (id)
);

insert into categories
(category)
values
('Vlog'),
('Review'),
('Moda e Estilo'),
('Beleza'),
('Fitness e Saúde'),
('Viagens'),
('Culinária'),
('Tecnologia'),
('Pais e Filhos'),
('Entretenimento'),
('Dança'),
('Musica'),
('Games'),
('Outros');