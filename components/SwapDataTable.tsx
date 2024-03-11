"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {swapsData} from "@/app/data/data"
import { useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import Link from "next/link";


const SwapDataTable=() =>{
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const handleFilterChange = (event:any) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = swapsData.filter((data) =>
  filter === '' || data.TOKEN === filter
);

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <div className="w-full">
      <div className="flex items-center py-4">
      <select
          value={filter}
          onChange={handleFilterChange}
          className="max-w-sm border border-gray-300 rounded px-3 py-1"
        >
          <option value="">All Pairs</option>
          <option value="ETH/USDT">ETH/USDT</option>
          <option value="USDC/ETH">USDC/ETH</option>
          <option value="DAI/MKR">DAI/MKR</option>
        </select>
       
      </div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">TOKENs</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Sender</TableHead>
          <TableHead>Token1 Volume</TableHead>
          <TableHead>Token2 Volume</TableHead>
          <TableHead>Transaction Hash</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentData.reverse().map((data,index) => (
          <TableRow key={`${data.TOKEN}-${data.sender}-${index}`}>
            <TableCell className="font-medium">{data.TOKEN}</TableCell>
            <TableCell>{data.timestamp}</TableCell>
            <TableCell>{data.type}</TableCell>
            <TableCell>{data.sender}</TableCell>
            <TableCell>{data.token1_volume}</TableCell>
            <TableCell>{data.token2_volume}</TableCell>
            <TableCell>
              <Link 
              href={`https://etherscan.io/tx/${data.transactionHash}`} target="_blank" rel="noopener noreferrer"
              className="text-blue-600 underline">
              {data.transactionHash}
              </Link>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
   
    <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            {currentPage !== 1 &&
            <PaginationPrevious
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            className="cursor-pointer"
          />
          }
            
          </PaginationItem>
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => {
            if (
              index + 1 === currentPage ||
              index + 1 === currentPage - 1 ||
              index + 1 === currentPage - 2 ||
              index + 1 === currentPage + 1 ||
              index + 1 === currentPage + 2
            ) {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    
                    isActive={currentPage === index + 1}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (
              index + 2 === currentPage - 2 ||
              index + 2 === currentPage + 2
            ) {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}
          <PaginationItem>
          {currentPage !== Math.ceil(filteredData.length / itemsPerPage) &&
            <PaginationNext
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            className="cursor-pointer"

            />
          }
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </div>
  )
}

export default SwapDataTable;
