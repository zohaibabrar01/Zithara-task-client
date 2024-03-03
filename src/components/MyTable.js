import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination, useSortBy } from 'react-table';
import AddCustomer from './Add'; // Assuming AddCustomer component is in a separate file

const MyTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://zithara-task-api.onrender.com/api/data');
        setData(response.data);
        setFilteredData(response.data); // Initialize filteredData with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on searchValue
    const filtered = data.filter(
      item =>
        item.customer_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.location.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchValue, data]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'S.No',
        accessor: 'sno',
      },
      {
        Header: 'Customer Name',
        accessor: 'customer_name',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Location',
        accessor: 'location',
      },
      {
        Header: 'Created Date',
        accessor: 'created_date',
        Cell: ({ value }) => {
          const date = new Date(value);
          return date.toLocaleDateString(); // Adjust date formatting as needed
        },
        sortType: (rowA, rowB, columnId) => {
          const dateA = new Date(rowA.values[columnId]);
          const dateB = new Date(rowB.values[columnId]);
          return dateA.getTime() - dateB.getTime();
        },
      },
      {
        Header: 'Created Time',
        accessor: 'created_time',
        sortType: (rowA, rowB, columnId) => {
          const timeA = new Date(`1970-01-01T${rowA.values[columnId]}`);
          const timeB = new Date(`1970-01-01T${rowB.values[columnId]}`);
          return timeA.getTime() - timeB.getTime();
        },
      },
    ],
    []
  );
   

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 20 },
    },
    useSortBy, // Enable sorting
    usePagination // Enable pagination
  );

  // Define buttonStyle within the MyTable component
  const [hoveredButton, setHoveredButton] = useState(null);

  const buttonStyle = {
    backgroundColor: '#FDF5E6', /* Cream */
    border: '1px solid black',
    color: 'black', /* Text color */
    padding: '10px 24px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background-color 0.3s',
  };

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <>
      <h1 style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'black',
  borderRadius: '10px', // Add rounded corners
  textShadow: '0 0 2px black', // Thin black outline
 
}}>CUSTOMER TABLE</h1>


      <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '50%', marginBottom: '10px' }}>
          <AddCustomer /> {/* Add Customer Button */}
          <label style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            <input
              type="text"
              style={{
                width: '100%', // Adjust the width as per your requirement
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '7px',
                boxSizing: 'border-box',
              }}
              placeholder="Search by Name or Location"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <table
          {...getTableProps()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            border: 'solid 1px blue',
            borderCollapse: 'collapse',
            width: '80%',
          }}
        >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())} // Enable sorting
                    style={{
                      borderBottom: 'solid 3px red',
                      background: 'aliceblue',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              // Iterate over the current page instead of rows
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'papayawhip',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          style={{
            ...buttonStyle,
            marginRight: '10px',
            backgroundColor: hoveredButton === 'previous' ? '#E0CBA8' : buttonStyle.backgroundColor,
          }}
          onMouseEnter={() => handleMouseEnter('previous')}
          onMouseLeave={handleMouseLeave}
        >
          Previous
        </button>{' '}
        <span>
          {pageIndex + 1} of {pageCount}
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          style={{
            ...buttonStyle,
            marginLeft: '10px',
            backgroundColor: hoveredButton === 'next' ? '#E0CBA8' : buttonStyle.backgroundColor,
          }}
          onMouseEnter={() => handleMouseEnter('next')}
          onMouseLeave={handleMouseLeave}
        >
          Next
        </button>
      </div>
      </div>
    </>
  );
};

export default MyTable;
