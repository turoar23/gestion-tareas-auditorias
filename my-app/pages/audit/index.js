import { Table, Button } from '@nextui-org/react';

// TODO: Repasar el buton y el uso del tag a
function Audits({ checklists }) {
	return (
		<div>
			<h1>Check-list creados</h1>
			<Button bordered color='primary' auto>
				<a href='/audit/create'>Nuevo</a>
			</Button>
			<Table
				aria-label='Check-List table'
				css={{
					height: 'auto',
					minWidth: '100%',
				}}
				selectionMode='single'
			>
				<Table.Header>
					<Table.Column>Nombre</Table.Column>
					<Table.Column>Categoria</Table.Column>
					<Table.Column>Descripción</Table.Column>
				</Table.Header>
				<Table.Body>
					{checklists.map(item => (
						<Table.Row key={item._id}>
							<Table.Cell>{item.name}</Table.Cell>
							<Table.Cell>{item.category}</Table.Cell>
							<Table.Cell>{item.description}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch('http://localhost:3000/api/checklist');
	const checklists = await res.json();

	return {
		props: {
			checklists,
		},
	};
}

export default Audits;
