export const data = [
    {
        id: '1',
        Task: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.',
        Due_Date: '25-May-2020',
    },
    {
        id: '2',
        Task: 'Fix Styling',
        Due_Date: '26-May-2020',
    },
    {
        id: '3',
        Task: 'Handle Door Specs',
        Due_Date: '27-May-2020',
    },
    {
        id: '4',
        Task: 'morbi',
        Due_Date: '23-Aug-2020',
    },
    {
        id: '5',
        Task: 'proin',
        Due_Date: '05-Jan-2021',
    },
];

export const columnsFromBackend = {
    New: {
        title: 'New',
        items: data
    },
    InProgress: {
        title: 'In Progress',
        items: []
    },
    Resolved: {
        title: 'Resolved',
        items: []
    },
    Reviewing: {
        title: 'Reviewing',
        items: []
    },
    Closed: {
        title: 'Closed',
        items: []
    }
};

