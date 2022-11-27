import {useState} from 'react'
import router from 'next/router'

function usePagination(data: any, pagination: any) {
  
  const [currentPage, setCurrentPage] = useState<number>(pagination.currentPage) 
  const maxPage = Math.ceil(data.length / pagination.itemsPerPage)
  const currentData = () =>{
    const begin = (currentPage -1) * pagination.itemsPerPage;
    console.log({begin})
    const end = currentPage * pagination.itemsPerPage
    console.log({end})
    return data.slice(begin, end)
  } 
  const handleNext =() =>{
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    router.push(`/blog?page=${currentPage+1}`)
  }
  const handlePrev = () =>{
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    router.push(`/blog?page=${currentPage-1}`)
  }
  return {currentPage,currentData, handleNext, handlePrev}
}


export default  usePagination

