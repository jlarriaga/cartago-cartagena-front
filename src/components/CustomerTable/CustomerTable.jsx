// const customers = [
//   {
//     id: 1,
//     name: 'John Doe',
//     checkInDate: '2023-02-01',
//     checkOutDate: '2023-02-05',
//     numOfTravelers: '4',
//     price: '$40',
//     isCurrent: false,
//   },
//   {
//     id: 2,
//     name: 'Tim Cook',
//     checkInDate: '2023-02-01',
//     checkOutDate: '2023-02-05',
//     numOfTravelers: '5',
//     price: '$80',
//     isCurrent: false,
//   },
 
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CustomerTable({customers}) {
  return (
    <div className="mt-24 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-left font-semibold leading-6 text-gray-900">Customers</h2>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
         
        </div>
      </div>
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Customer Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, planIdx) => (
              <tr className="hover:bg-slate-50 cursor-pointer" key={customer.id}>
                <td
                  className={classNames(
                    planIdx === 0 ? '' : 'border-t border-gray-200',
                    'relative py-4 pl-4 pr-3 text-left text-sm sm:pl-6'
                  )}
                >
                  <div className="font-medium text-gray-900">
                    {customer.fullName}
                  </div>

                </td>
                <td
                  className={classNames(
                    planIdx === 0 ? '' : 'border-t border-gray-200',
                    'hidden px-3 py-3.5 text-left text-sm text-gray-500 lg:table-cell'
                  )}
                >
                  {customer.email}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
