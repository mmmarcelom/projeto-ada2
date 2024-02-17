CREATE TABLE owners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES owners(id)
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    list_id INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (list_id) REFERENCES lists(id)
);

insert into owners (name, email) values 
('Marcelo', 'marcelo.mesquita@teste.com.br'),
('Tainá', 'taina.teixeira@teste.com.br')

select * from owners

insert into lists (name, owner_id) values 
('Supermercado',1),
('Oficina',1),
('Papelaria',2)

select * from lists

insert into items (name, quantity, list_id) values
('Maça', 5, 1),
('Banana', 12, 1),
('Farinha', 2, 1),
('Ovos', 24, 1),
('Biscoito', 2, 1),
('Leite', 3, 1),
('Chave de roda', 1, 2),
('Pneu Michellan', 1, 2),
('Roda Aro 14"', 1, 2),
('Parafuso Roda Aro 14"', 4, 2),
('Lapís', 10, 3),
('Borracha', 10, 3),
('Caderno', 10, 3)

select * from items where list_id = 2