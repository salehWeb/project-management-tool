import React, { useState } from 'react';
import { columnsFromBackend } from './KanbanData';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box'

interface IColumns {
    ToDo: {
        title: string;
        items: {
            id: string;
            Task: string;
            Due_Date: string;
        }[];
    };
    InProgress: {
        title: string;
        items: {
            id: string;
            Task: string;
            Due_Date: string;
        }[];
    };
    Done: {
        title: string;
        items: {
            id: string;
            Task: string;
            Due_Date: string;
        }[];
    };
}

interface IColumnsEntries {
    columnId: string;
    column: {
        title: string;
        items: {
            id: string;
            Task: string;
            Due_Date: Date;
        }[];
    };
};

interface IDropResult {
    source: {
        index: number;
        droppableId: 'ToDo' | 'InProgress' | 'Done';
    };
    destination: {
        index: number;
        droppableId: 'ToDo' | 'InProgress' | 'Done';
    }
}

const Kanban = () => {
    const [columns, setColumns] = useState<IColumns>(columnsFromBackend);

    const onDragEnd = (result: IDropResult) => {

        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {

            const sourceColumn = columns[source.droppableId];

            const destColumn = columns[destination.droppableId];

            const sourceItems = [...sourceColumn.items];

            const destItems = [...destColumn.items];

            const [removed] = sourceItems.splice(source.index, 1);

            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: { ...sourceColumn, items: sourceItems },
                [destination.droppableId]: { ...destColumn, items: destItems }
            });

        }
        else {
            const column = columns[source.droppableId];

            const copiedItems = [...column.items];

            const [removed] = copiedItems.splice(source.index, 1);

            copiedItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: { ...column, items: copiedItems }
            });

        }
    };


    return (
        <DragDropContext onDragEnd={(result) => onDragEnd(result as IDropResult)}>
            <div className="relative mx-auto">
                <div className="hover:bg-white bg-gray-50 w-max border-1 p-1 hover:p-1.5 transition-all shadow-xl rounded-full flex items-center justify-center text-center text-2xl text-gray-700 cursor-pointer absolute top-[50%] -left-4">
                    <ArrowBackIosIcon />
                </div>
                <Box
                    className="overflow-x-auto gap-4 bg-blue-100 border-2  rounded-md
             shadow-xl p-8 flex  min-h-[80vh] max-w-[80vw] my-10">

                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <Droppable key={index} droppableId={columnId}>
                                {(provided, snapshot) => (
                                    <div className="min-h-[100px] border-2 shadow-xl flex flex-col bg-gray-100 min-w-[341px] rounded-md p-4"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <span className="text-blue-600 bg-gray-200 pt-0.5 px-[10px] rounded-md self-start">
                                            {column.title}</span>
                                        {column.items.map((item, index) => (
                                            <TaskCard key={index} item={item} index={index} />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        );
                    })}
                </Box>
                <div className="hover:bg-white bg-gray-50 border-1 p-1 hover:p-1.5 transition-all  shadow-xl rounded-full flex items-center justify-center text-center text-2xl text-gray-700 cursor-pointer absolute top-[50%] -right-4">
                    <ArrowForwardIosIcon />
                </div>
            </div>
        </DragDropContext>
    );
};

export default Kanban;
