import {useState} from 'react'

function usePagination(data: any, itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1) 
  const maxPage = Math.ceil(data.length / itemsPerPage)
  const currentData = () =>{
    const begin = (currentPage -1) * itemsPerPage;
    console.log({begin})
    const end = currentPage * itemsPerPage
    console.log({end})
    return data.slice(begin, end)
  } 
  const handleNext =() =>{
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }
  const handlePrev = () =>{
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }
  return {currentPage,currentData, handleNext, handlePrev}
}


export default  usePagination

