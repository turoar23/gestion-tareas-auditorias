import Link from 'next/link';
import { Table, Button, Tooltip, Row, Col } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import EyeIcon from '../../components/UI/EyeIcon';
import IconButton from '../../components/UI/IconButton';
import DeleteIcon from '../../components/UI/DeleteIcon';

// TODO: Repasar el buton y el uso del tag a
function Audits({ checklists }) {
	const [checkLists, setCheckLists] = useState(checklists);
	const router = useRouter();

	const handleRemove = async checklistId => {
		const request = await fetch(
			'http://localhost:3000/api/checklist/' + checklistId,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		if (request.ok) {
			const newCheckLists = checkLists.filter(
				item => item._id !== checklistId
			);
			setCheckLists(newCheckLists);
		} else {
			alert('Se ha producido un error');
		}
	};

	return (
		<div>
			<h1>Check-list creados</h1>
			<Button bordered color='primary' auto>
				<Link href='/checklist/create'>Nuevo</Link>
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
					<Table.Column>Actions</Table.Column>
				</Table.Header>
				<Table.Body>
					{checkLists.map(item => (
						<Table.Row key={item._id}>
							<Table.Cell>{item.name}</Table.Cell>
							<Table.Cell>{item.category}</Table.Cell>
							<Table.Cell>{item.description}</Table.Cell>
							<Table.Cell>
								<Row justify='center' align='center'>
									<Col css={{ d: 'flex' }}>
										<Tooltip content='Detalles'>
											<IconButton
												onClick={() => {
													router.push(
														'/checklist/' + item._id
													);
												}}
											>
												<EyeIcon
													size={20}
													fill='#979797'
												/>
											</IconButton>
										</Tooltip>
									</Col>
									<Col css={{ d: 'flex' }}>
										<Tooltip content='Eliminar'>
											<IconButton
												onClick={() => {
													handleRemove(item._id);
												}}
											>
												<DeleteIcon
													size={20}
													fill='#979797'
												/>
											</IconButton>
										</Tooltip>
									</Col>
								</Row>
							</Table.Cell>
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
