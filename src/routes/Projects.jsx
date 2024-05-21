import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { useEffectOnce, useToggle } from "react-use";
import CreateDialog from "../components/CreateDialog";
import UpdateDialog from "../components/UpdateDialog";
import { useMemo, useState } from "react";
import { fetchProjects } from "../api/projectApi";
import toast from "react-hot-toast";
import { formatDate, toDate } from "../utils/dateUtils";
import DeleteDialog from "../components/DeleteDialog";

const Projects = () => {
    const [openCreateDialog, toggleCreateDialog] = useToggle(false);
    const [openUpdateDialog, toggleUpdateDialog] = useToggle(false);
    const [openDeleteDialog, toggleDeleteDialog] = useToggle(false);
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [offset, setOffset] = useState(1);
    const [projectForUpdate, setProjectForUpdate] = useState({
        id: 0, 
        name: "", 
        description: "", 
        startDate: "", 
        endDate: ""
    });

    const disableNextBtn = useMemo(() => projects.length + offset === total, [offset, projects.length, total])

    const TABLE_HEAD = ["Name", "Description", "Start Date", "End Date", ""];

    const fetch = (page) => {
        fetchProjects(page).then((res) => {
            setProjects(res.list);
            setTotal(res.meta.total);
            setOffset(res.meta.offset);
          }).catch(() => {
            toast.error('Failed to fetch projects.');
          })
    };

    const refresh = () => {
        fetch(1);
        setPage(1);
    }

    useEffectOnce(() => {
      fetch(page);
      
    });
    
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
                    {projects.map(({ id, name, description, startDate, endDate }, index) => {
                        const isLast = index === projects.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            
                        return (
                        <tr key={id}>
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
                                {endDate ?? '-'}
                            </Typography>
                            </td>
                            <td className={classes}>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={() => {
                                        setProjectForUpdate({ id, name, description, startDate: formatDate(toDate(startDate)), endDate: endDate ? formatDate(toDate(endDate)) : "" });
                                        toggleDeleteDialog();
                                    }}
                                    className="mr-1"
                                    size="sm"
                                >
                                    <span>Delete</span>
                                </Button>
                                <Button variant="text" size="sm" onClick={() => {
                                    setProjectForUpdate({ id, name, description, startDate: formatDate(toDate(startDate)), endDate: endDate ? formatDate(toDate(endDate)) : "" });
                                    toggleUpdateDialog();
                                }}>Edit</Button>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                Page {offset + projects.length} of {total}
                </Typography>
                <div className="flex gap-2">
                <Button 
                    variant="outlined" 
                    size="sm" 
                    disabled={page === 1} 
                    onClick={() => setPage((p) => {
                        const prevPage = --p;
                        fetch(prevPage);
                        return prevPage;
                    })}
                >
                    Previous
                </Button>
                <Button 
                    variant="outlined" 
                    size="sm" 
                    disabled={disableNextBtn} 
                    onClick={() => {
                        setPage((p) => {
                            const nextPage = ++p;
                            fetch(nextPage)
                            return nextPage;
                        });
                    }}
                >
                    Next
                </Button>
                </div>
            </CardFooter>
        </Card>
        <CreateDialog 
            open={openCreateDialog} 
            handleOpen={toggleCreateDialog} 
            onCreate={refresh}
        />
        <UpdateDialog 
            open={openUpdateDialog} 
            handleOpen={toggleUpdateDialog} 
            onUpdate={refresh} 
            project={projectForUpdate}
        />
        <DeleteDialog 
            open={openDeleteDialog}     
            handleOpen={toggleDeleteDialog} 
            onDelete={refresh} 
            projectName={projectForUpdate.name} 
            projectId={projectForUpdate.id}
        />
    </>
  )
}

export default Projects
