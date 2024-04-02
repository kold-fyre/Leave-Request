import Modal from '@/components/custom/Modal';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import useRequests from '@/hooks/useRequests';
import { IRequest } from '@/models/interfaces';
import { CheckIcon, XIcon } from 'lucide-react';

const AppliedLeaves = () => {

	const { requests, approveRequest, rejectRequest } = useRequests();

	const easyDate = (date: string) => {
		return new Date(date).toDateString();
	};

	return (
		<div className="container mx-auto border px-0 rounded-lg">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-32"> Emp. ID </TableHead>
						<TableHead> Name </TableHead>
						<TableHead className="w-10 hidden lg:table-cell">
							Gender
						</TableHead>
						<TableHead> Leave Date </TableHead>
						<TableHead> Return Date </TableHead>
						<TableHead className="hidden lg:table-cell">
							Reasons
						</TableHead>
						<TableHead className="text-center"> </TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{requests.map((r: IRequest, i: number) => (
						<TableRow key={i}>
							<TableCell> {r.employee.id} </TableCell>
							<TableCell className="font-medium">
								{r.employee.name}
							</TableCell>
							<TableCell className="uppercase hidden lg:table-cell">
								{r.employee.gender}
							</TableCell>
							<TableCell> {easyDate(r.leaveDate)} </TableCell>
							<TableCell> {easyDate(r.returnDate)} </TableCell>
							<TableCell className="hidden lg:table-cell">
								{r.reason}
							</TableCell>
							<TableCell className="flex justify-center gap-x-2">
								{!r.isApproved && !r.isRejected ? (
									<>
										<Modal
											actionName={'approve'}
											action={() => approveRequest(r.employee.id)}
											title={'Approve request?'}
											description={`Accept leave request from ${r.employee.name}?`}>
											<div className="rounded-lg scale-75 p-2 border border-transparent hover:border-green-500 text-green-500">
												<CheckIcon />
											</div>
										</Modal>

										<Modal
											actionName={'reject'}
											action={() => rejectRequest(r.employee.id)}
											title={'Reject request?'}
											description={`Reject leave request from ${r.employee.name}?`}>
											<div className="rounded-lg scale-75 p-2 border border-transparent hover:border-red-500 text-red-500">
												<XIcon />
											</div>
										</Modal>
									</>
								) : r.isApproved ? (
									<Badge variant={'default'}>
                                        Approved
                                    </Badge>
								) : (
									r.isRejected && (
										<Badge variant={'destructive'}>
											Rejected
										</Badge>
									)
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default AppliedLeaves;
