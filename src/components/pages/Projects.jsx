import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { useToggle } from "react-use";
import CreateDialog from "../components/CreateDialog";
import UpdateDialog from "../components/UpdateDialog";
import { useEffect, useState } from "react";
import { fetchProjects } from "../../api/projectApi";

const Projects = () => {
    const [openCreateDialog, toggleCreateDialog] = useToggle(false);
    const [openUpdateDialog, toggleUpdateDialog] = useToggle(false);
    const [isDestory, setIsDestory] = useState(false);
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const TABLE_HEAD = ["Name", "Description", "Start Date", "End Date", ""];
    useEffect(() => {
      fetchProjects(1).then((res) => {
        if(!isDestory) {
            setProjects(res.list);
            setTotal(res.meta.total);
        }
      })
    
      return () => {
        setIsDestory(true)
      }
    })
    
  return (
    <>
        <div className="mb-6 text-center">
            <Typography variant="h2">Projects Management</Typography>
        </div>
        
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex justify-end">
                    <Button onClick={toggleCreateDialog}>Create New Project</Button>
                </div>
            </CardHeader>
            <CardBody className="overflow-auto px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                        <th
                            key={head}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                            >
                            {head}
                            </Typography>
                        </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {projects.map(({ name, description, startDate, endDate }, index) => {
                        const isLast = index === projects.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            
                        return (
                        <tr key={name}>
                            <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {name}
                            </Typography>
                            </td>
                            <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {description}
                            </Typography>
                            </td>
                            <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {startDate}
                            </Typography>
                            </td>
                            <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {endDate}
                            </Typography>
                            </td>
                            <td className={classes}>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={() => console.log('delete')}
                                    className="mr-1"
                                    size="sm"
                                >
                                    <span>Delete</span>
                                </Button>
                                <Button variant="text" size="sm" onClick={toggleUpdateDialog}>Edit</Button>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                Page {page} of {total}
                </Typography>
                <div className="flex gap-2">
                <Button 
                    variant="outlined" 
                    size="sm" 
                    disabled={page === 1} 
                    onClick={() => setPage((p) => p - 5)}
                >
                    Previous
                </Button>
                <Button 
                    variant="outlined" 
                    size="sm" 
                    disabled={page + 5 > total} 
                    onClick={() => setPage((p) => p + 5)}
                >
                    Next
                </Button>
                </div>
            </CardFooter>
        </Card>
        <CreateDialog open={openCreateDialog} handleOpen={toggleCreateDialog}/>
        <UpdateDialog open={openUpdateDialog} handleOpen={toggleUpdateDialog}/>
    </>
  )
}

export default Projects
