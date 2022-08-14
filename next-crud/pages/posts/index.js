import Layout from '../../components/layout';


import Link from 'next/link';

import axios from 'axios';

// router 
import {useRouter} from 'next/router';

// mantine
import { Button } from '@mantine/core';
import { Table } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons';


// fetch data with getServerSideProps()
export async function getServerSideProps(){
    //http request 
    const req = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`)
    const res = await req.data.data.data

    return {
        props:{
            posts :res,
            
        },
    }
}

function PostIndex(props){

    // destruct 
    const {posts} = props;

    //router
    const router = useRouter();

    //refresh Data
    const refreshData = () =>{
        router.replace(router.asPath);
    }

    //function deletePost
    const deletePost = async (id) =>{
        if (confirm("Apakah anda yakin untuk menghapus ?") == true) {
            // sending
            await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${id}`);
            // refresh data 
            refreshData();        
        }        
    }


    return(
        <Layout>
            {/* <div className="container" style={{ marginTop: '80px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-body"> */}
                                <Link href="/posts/create">
                                    <Button mb={10}>TAMBAH</Button>
                                </Link>
                                
                                <Table striped highlightOnHover  >
                                    <thead>
                                        <tr>
                                            <th scope="col">IMAGE</th>
                                            <th scope="col">JUDUL</th>
                                            <th scope="col">CONTENT</th>
                                            <th scope="col">AKSI</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { posts.map((post) => (
                                        <tr key={ post.id }>
                                            <td className="text-center">
                                                <img src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/posts/${post.image}`} width="150" className="rounded-3"/>
                                            </td>
                                            <td>{ post.title }</td>
                                            <td>{ post.content }</td>
                                            <td className="text-center">
                                            

                                                <Link href={` /posts/edit/${post.id}`}>
                                                <Button color="indigo" mx={10}><IconPencil /> EDIT</Button></Link>
                                                <Button color="red" onClick={()=>deletePost(post.id)}><IconTrash /> DELETE</Button>
                                            </td>
                                        </tr>
                                    )) }
                                    </tbody>
                                </Table>  
                            {/* </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </Layout>
    )
}

export default PostIndex;


