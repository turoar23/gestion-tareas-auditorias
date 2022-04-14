import Link from 'next/link';
import { Table, Button, Tooltip, Row, Col } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import EyeIcon from '../../components/UI/EyeIcon';
import IconButton from '../../components/UI/IconButton';
import DeleteIcon from '../../components/UI/DeleteIcon';

const Audit = ({ audits }) => {
	const [listAudits, setListAudits] = useState(audits);
	const router = useRouter();

	return (
		<div>
			<h1>Auditorias</h1>
			<Button bordered color='primary' auto>
				<Link href='/audit/create'>Nueva</Link>
			</Button>
			<Table
				aria-label='Audits table'
				css={{
					height: 'auto',
					minWidth: '100%',
				}}
				selectionMode='single'
			>
				<Table.Header>
					<Table.Column>Fecha</Table.Column>
					<Table.Column>Check-list</Table.Column>
					<Table.Column>Auditor</Table.Column>
					<Table.Column>Actions</Table.Column>
				</Table.Header>
				<Table.Body>
					{listAudits &&
						listAudits.map(item => (
							<Table.Row key={item._id}>
								<Table.Cell>{item.updated_at}</Table.Cell>
								<Table.Cell>{item.checklist.name}</Table.Cell>
								<Table.Cell>{item.auditor}</Table.Cell>
								<Table.Cell>
									<Row justify='center' align='center'>
										<Col css={{ d: 'flex' }}>
											<Tooltip content='Detalles'>
												<IconButton
													onClick={() => {
														router.push(
															'/audit/' + item._id
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
												// onClick={() => {
												// 	handleRemove(item._id);
												// }}
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
};

export async function getStaticProps() {
	const res = await fetch('http://localhost:3000/api/audit');
	const audits = await res.json();

	return {
		props: {
			audits,
		},
	};
}

export default Audit;
