import axios from 'axios';
import { ICreateProject } from '../types/project';
import { ILogin, IMangeUsersRoles, ISingUp, IUser } from '../types/user'

let baseURL = 'http://localhost:3000/api'
let ISSERVER = typeof window === "undefined";
let isFoundUser: string | null = null;
let user: IUser | null = null;

if (!ISSERVER) isFoundUser = localStorage.getItem("user");
if (isFoundUser) user = JSON.parse(isFoundUser);

if (process.env.NODE_ENV === "production" && !ISSERVER) {
    baseURL = `https://${window.location.host}/api`;
}

const API = axios.create({ baseURL: baseURL })

API.interceptors.request.use((req) => {
    if (user && req?.headers?.authorization) req.headers.authorization = `Bearer ${user.token}`;
    return req
})

export const singUp = async (data: ISingUp) => await API.post("/auth/sign-up", data)

export const login = async (data: ILogin) => await API.post("/auth/login", data)

export const Logout = async () => await API.get("/auth/logout")

export const GetToken = async () => await API.get("/auth/refresh-token");

export const getUsers = async () => await API.get("/user");

export const getProjectMangers = async () => await API.get("/user/?only-project-manger=true");

export const createProject = async (data: ICreateProject) => await API.post("/project", data);

export const mangeUsersIds = async (data: IMangeUsersRoles) => await API.patch("/user", data);