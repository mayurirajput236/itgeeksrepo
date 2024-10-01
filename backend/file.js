import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import HeaderDashboard from '../components/HeaderDashboard';
import axios from 'axios';
import { UPDATE } from 'sequelize/lib/query-types';
import { Json } from 'sequelize/lib/utils';
import { json } from 'sequelize';

function SubmitBook() {
    const [userId, setUserId] = useState("");
    const [toGetUserId, setToGetUserId] = useState(true);
    const [booksList, setBooksList] = useState([]); // Use state for booksList

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/admin/assignedBooks/${userId}`);
            if (response.data.result && response.data.result.status) {
                console.log(response.data.result.result);
                setToGetUserId(false);
                setBooksList(response.data.result.result); 
                console.log(response.data.result.result.length); // Log the length directly
            } else {
                console.error('Failed to assign books:', response.data.result.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error occurred while assigning books:', error);
        }
    };

    return (
        <div className='w-[100%]  h-[100%] bg-[#E5E7EB]  flex '>
            <div className='w-[20%] rounded-full'>
                <Sidebar />
            </div>
            <div className='w-[80%]  bg-[#E5E7EB]'>
                <HeaderDashboard />
                <div>
                    {toGetUserId ? (
                        <form onSubmit={handleSubmit} className="bg-white py-[110px] flex justify-center gap-10 items-center flex-col w-[100%] h-[85vh] rounded shadow-md">
                            <label className="text-3xl">User ID</label>
                            <input
                                type="text"
                                name="userId"
                                id="userId"
                                placeholder='user id'
                                value={userId}
                                onChange={(e) => { setUserId(e.target.value) }}
                                className="w-[25%] p-2 border border-gray-300 rounded"
                                required
                            />
                            <div className='flex w-[50%] justify-center items-center'>
                                <button
                                    type="submit"
                                    className="w-[50%] bg-[#081029] text-white font-bold py-2 rounded hover:bg-blue-500"
                                >
                                    Issued Books
                                </button>
                            </div>
                        </form>
                    ) : null}
{
    !toGetUserId ? 
    <div className="container mx-auto mt-5">
        <table className="min-w-full border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Book Id</th>
                    <th className="border border-gray-300 px-4 py-2">Book Name</th>
                    <th className="border border-gray-300 px-4 py-2">Column 3</th>
                    <th className="border border-gray-300 px-4 py-2">Column 4</th>
                </tr>
            </thead>
            <tbody>
                {booksList.map((book, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                       
                        <td className="border border-gray-300 px-4 py-2">{book.book.bookId}</td> {/ Access the book property /}
                        <td className="border border-gray-300 px-4 py-2">{book.book.bookName}</td>
                        <td className="border border-gray-300 px-4 py-2">{book.book.author} </td>
                        <td className="border border-gray-300 px-4 py-2">{book.book.pages}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div> 
    :
    null
}
                </div>
            </div>
        </div>
    );
}

export default SubmitBook;


#today UPDATE
* Study React js 
* Using Rect create Admin Dashboard of School management system.
*Using  React create class /teacher / student Dashboard of School management system //some of desing or functionality remaining
