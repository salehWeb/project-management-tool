import useGetUser from "../../hooks/useGetUser";

const UserComponent = () => {
    const [user] = useGetUser();

    return (
        <>
            {user && ( <h1 className="h1_id">{user.firstName}</h1> )}
        </>
    )
};

export default UserComponent;