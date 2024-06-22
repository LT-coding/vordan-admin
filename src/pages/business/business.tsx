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
import DeleteBusinessDialog from './delete-business-dialog'

// company_name
// verified
// logoadmin.name
// admin.email
// tax_code
// register_code
// registered_address
// activity_address

const businessMockData = [
  {
    id: 1,
    verified: true,
    logo: 'https://via.placeholder.com/50',
    company_name: 'John Doe',
    email: 'kohapcwdpi@outlook.com',
    tax_code: '555-555-5555',
    register_code: 'Admin',
    registered_address: 'Admin',
    activity_address: 'Admin',
  },
  {
    id: 2,
    verified: false,
    logo: 'https://via.placeholder.com/50',
    company_name: 'John Doe',
    email: 'kohapcwdpi@outlook.com',
    tax_code: '555-555-5555',
    register_code: 'Admin',
    registered_address: 'Admin',
    activity_address: 'Admin',
  },
]

export default function Business() {
  return (
    <div className='flex-1'>
      <Header title='Business'>
        <Link to='/business/add'>
          <Button variant='ghost' className='gap-2'>
            Create Business
            <CirclePlus />
          </Button>
        </Link>
      </Header>
      <div className='p-4'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Verified</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tax Code</TableHead>
              <TableHead>Register Code</TableHead>
              <TableHead>Registered Address</TableHead>
              <TableHead>Activity Address</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businessMockData?.map((business) => (
              <TableRow key={business.id}>
                <TableCell
                  className={
                    business.verified ? 'text-green-500' : 'text-red-500'
                  }
                >
                  {business.verified ? 'Verified' : 'Not Verified'}
                </TableCell>
                <TableCell>
                  <div>
                    <img src={business.logo} alt='logo' />
                  </div>
                </TableCell>
                <TableCell>{business.company_name}</TableCell>
                <TableCell>{business.email}</TableCell>
                <TableCell>{business.tax_code}</TableCell>
                <TableCell>{business.register_code}</TableCell>
                <TableCell>{business.registered_address}</TableCell>
                <TableCell>{business.activity_address}</TableCell>
                <TableCell className='w-24'>
                  <div className='flex gap-2 justify-end'>
                    <Link to={`/business/${business.id}/edit`}>
                      <Button size='iconSm'>
                        <FilePenLine size={20} />
                      </Button>
                    </Link>
                    <DeleteBusinessDialog business={business} />
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
