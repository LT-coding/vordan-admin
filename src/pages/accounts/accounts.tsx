import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CirclePlus, FilePenLine } from 'lucide-react'
import { Link } from 'react-router-dom'
import DeleteAccountDialog from './delete-account-dialog'

const accountsMockData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'kohapcwdpi@outlook.com',
    phone: '555-555-5555',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'fgdykwfeiv@hotmail.com',
    phone: '555-555-5555',
    role: 'Manager',
  },
  {
    id: 3,
    name: 'Jane Doe',
    email: 'vjroaxirgz@outlook.com',
    phone: '555-555-5555',
    role: 'Manager',
  },
]

export default function Accounts() {
  return (
    <div className='flex-1'>
      <Header title='Accounts'>
        <Link to='/accounts/add'>
          <Button variant='ghost' className='gap-2'>
            Create Request
            <CirclePlus />
          </Button>
        </Link>
      </Header>
      <div className='p-4'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accountsMockData?.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.phone}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.role}</TableCell>
                <TableCell className='w-24'>
                  <div className='flex gap-2 justify-end'>
                    <Link to={`/accounts/${account.id}/edit`}>
                      <Button size='iconSm'>
                        <FilePenLine size={20} />
                      </Button>
                    </Link>
                    <DeleteAccountDialog account={account} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
