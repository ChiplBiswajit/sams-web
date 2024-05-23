import React from 'react'
export default function SAmaintenance() {
    return (
        <section className='h-screen'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {/* <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="w-full bg-[#b2c1e0] text-xs text-gray-700 uppercase dark:text-gray-400"> */}
                <table className="min-w-[99%] divide-y divide-gray-200 m-1 hidden md:table">
                    <thead className="bg-[#b2c1e0] ">
                        <tr >
                            <th
                                scope="col"
                                className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider">
                                Sl.no.
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider">
                             Ambulance No
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider">
                            Remark(Reason)
                            </th>
                            <th
                                scope="col"
                                className="px-2 py-3 text-center text-xs font-bold text-black uppercase tracking-wider">
                              Region
                            </th>
                         
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-6 py-4">
                               1
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                Laptop
                            </td>
                          
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-6 py-4">
                                1
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                Laptop
                            </td>
                           
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-6 py-4">
                                1
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                Laptop
                            </td>
                           
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="px-6 py-4">
                                1
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                Laptop
                            </td>
                           
                        </tr>
    
                       
                    </tbody>
                </table>
            </div>

        </section>
    )
}
