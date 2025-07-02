"use client"

import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { subjects } from '@/constants';

const SubjectFilter = () => {

  const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";
  
    const [subject , setSubject] = useState(query);
    
    useEffect(()=>{
      let newurl = "";
      if(subject == "all"){
          newurl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["subject"],
        });
      }else{
        newurl = formUrlQuery({
          params:searchParams.toString(),
          key:"subject",
          value:subject
        })
      }
      router.push(newurl,{scroll:false});

    },[subject,router,searchParams,pathname])

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className='input capitalize'>
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          All Subject
        </SelectItem>
        {subjects.map((subject)=>(
          <SelectItem key={subject} value={subject} className='capitalize'>
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SubjectFilter
