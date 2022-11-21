import moment from 'moment';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface ITaskCardProps {
    item: {
        id: string;
        Task: string;
        Due_Date: Date;
    }
    index: number;
}

const TaskCard = ({ item, index }: ITaskCardProps) => {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index} >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="flex flex-col justify-center items-start px-4 min-h-[106px] rounded-md max-w-[311px] border-2 bg-white mt-4">
                        <p>{item.Task}</p>
                        <div className="flex justify-between items-center w-full text-[12px] font-[12px] text-gray-400">
                            <p>
                                <span>{moment(item.Due_Date).format("ll")}</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;