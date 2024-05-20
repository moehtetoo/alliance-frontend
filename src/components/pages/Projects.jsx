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
    const TABLE_HEAD = ["Name", "Job", "Employed", ""];
    const TABLE_ROWS = [
        {
          name: "John Michael",
          job: "Manager",
          date: "23/04/18",
        },
        {
          name: "Alexa Liras",
          job: "Developer",
          date: "23/04/18",
        },
        {
          name: "Laurent Perrier",
          job: "Executive",
          date: "19/09/17",
        },
        {
          name: "Michael Levi",
          job: "Developer",
          date: "24/12/08",
        },
        {
          name: "Richard Gran",
          job: "Manager",
          date: "04/10/21",
        },
      ];
    useEffect(() => {
      fetchProjects().then((res) => {
        if(isDestory) {
            console.log(res)
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
                    {TABLE_ROWS.map(({ name, job, date }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
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
                                {job}
                            </Typography>
                            </td>
                            <td className={classes}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                            >
                                {date}
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
                Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                <Button variant="outlined" size="sm">
                    Previous
                </Button>
                <Button variant="outlined" size="sm">
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
