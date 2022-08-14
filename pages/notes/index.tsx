import {
    Box, Button, FormControl,
    FormLabel, Heading, Input, List, ListIcon, ListItem, Stack, Textarea
} from '@chakra-ui/react';
import React,{ useRef } from 'react';
import { MdCheckCircle, MdSettings } from "react-icons/md";
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { prisma } from '../../lib/prisma';

interface FormData {
    title: string,
    content: string,
    id: string
  }
  
  interface Notes {
    notes : {
      id: string;
      title: string;
      content: string
    }[]
  }


const Home = ({notes} :Notes) => {

  const ref:React.RefObject<HTMLDivElement> = React.createRef()

  function updateNote(data: any) {
    setForm(data)
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }
  
    const [form, setForm] = useState<FormData>({title: '', content: '', id:''})
  
    const router = useRouter();

  //   const titleRef = useRef();

  //   function handleBackClick() {
  //     titleRef.current.scrollIntoView({ behavior: 'smooth' })
  // }
  
    const refreshData = () => {
      router.replace(router.asPath)
    }
    async function create(data:FormData) {
        try {
          fetch('http://localhost:3000/api/create' , {
            body: JSON.stringify(data),
            headers: {
              'Content-Type' : 'application/json'
            },
            method:'POST'
          }).then(() => {
            if(data.id){
              deleteNote(data.id)
              setForm({title: '', content: '', id: ''})
              refreshData()
            }else{
              setForm({title: '', content: '', id: ''})
              refreshData()
            }
          }
            )
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      }
    
      async function deleteNote(id:string) {
        try {
          fetch(`http://localhost:3000/api/note/${id}`, {
          headers : {
            "Content-Type": "application/json",
          },
          method : "DELETE"
        }).then(() => {
          refreshData()
        })
       } catch (error) {
          console.log(`Error: ${error}`)
        }
      }
      

    
      const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        try {
          ev.preventDefault()
          if (!form.title || !form.content || form.content === '' || form.title === ''){
            alert('Noted Tidak Boleh Di Isi Kosong!')
          }else{
          create(form)
          }
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      }
    return (
        <>
                
        <Box maxW="960px" mx="auto" mt="5" mb="5" position="static" boxShadow='2xl' p='6' rounded='md' bg='white' ref={ref}>
        <Heading my="5" >Create Notes In Here</Heading>
        <FormControl position="static" >
            <form action="" onSubmit={handleSubmit}>
            <FormLabel htmlFor='email'>Title</FormLabel>
            <Input id='title' type='text'position="static"placeholder='Masukan Title Disini!'
            value={form.title}
            onChange={e => setForm({...form, title : e.target.value})}
            />
            <FormLabel htmlFor='email' position="static">Content</FormLabel>
            <Textarea position="static" placeholder='Masukan Content Disini!'
                    value={form.content}
                    onChange={e => setForm({...form, content : e.target.value})}
            />
        <Stack spacing={4} direction='row' align='center' mt="5" position="static">
            <Button colorScheme='teal' size='md'  type='submit'>
                Create
            </Button>
        </Stack>
            </form>
        </FormControl>

        </Box>

        <Box maxW="960px" mx="auto" mt="5" mb="5" border={2} position="static" boxShadow='2xl' p='6' rounded='md' bg='white'>
        {notes?.map(note=> (
        <List spacing={3} position="static" key={note.id} my="5" >
            <ListItem fontSize={25}>
                {/* <ListIcon as={MdCheckCircle} color='green.500' /> */}
              <strong> Title: {note.title} </strong>
           </ListItem>
           <ListItem fontSize={20}>
                {/* <ListIcon as={MdCheckCircle} color='green.500' /> */}
                Content: {note.content}
           </ListItem>
                <Button onClick={()=> updateNote({title: note.title, content: note.content, id: note.id})} position="static" colorScheme='facebook' size='md' ml={4} >
                Update
                </Button>
                <Button onClick={()=> deleteNote(note.id)} position="static" colorScheme='red' size='md' ml={4}  >
                Delete
                </Button>
 
        </List>
        ))}
        </Box>

        </>
    );
};

export default Home;


export const getServerSideProps : GetServerSideProps = async () => {
    const notes = await prisma.note.findMany({
      select: {
        title:true,
        id: true,
        content: true
      }
    })
  
    return {
      props:{
        notes
      }
    }
  }

