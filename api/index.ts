import axios from 'axios';
import { IUpdateProfileGeneralInformation } from '../types/profile';
import { ICreateProject } from '../types/project';
import { ICreateTicket } from '../types/ticket';
import { IChangePassword, ILogin, IMangeUsersRoles, ISingUp, IUser } from '../types/user'

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
    if (user && req.headers) req.headers.authorization = `Bearer ${user.token}`;
    return req
})

export const singUp = async (data: ISingUp) => await API.post("/auth/sign-up", data)

export const login = async (data: ILogin) => await API.post("/auth/login", data)

export const Logout = async () => await API.get("/auth/logout")

export const GetToken = async () => await API.get("/auth/refresh-token");

export const getUsers = async () => await API.get("/user");

export const getAssignTo = async () => await API.get("/user/?get-assign-to=true");

export const getProjectMangers = async () => await API.get("/user/?only-project-manger=true");

export const createProject = async (data: ICreateProject) => await API.post("/project", data);

export const mangeUsersIds = async (data: IMangeUsersRoles) => await API.patch("/user", data);

export const ChangePassword = async (data: IChangePassword) => await API.patch("/auth/change-password", data)

export const getProfileData = async () => await API.get("/profile")

export const updateProfile = async (data: IUpdateProfileGeneralInformation) => await API.patch("/profile", data)

export const uploadFile = async (files: File[]) => {
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) { formData.set(`file${i}`, files[i]) }
    return await API.postForm("/upload", formData)
}

export const getTagsOptions = async () => await API.get("/tags");

export const createTicket = async (data: ICreateTicket, projectId: number) => await API.post(`/ticket/?projectId=${projectId}`, data)

export const getTicketsForProjectPage =
async (projectId: number, skip: number, take: number) => await API.get(`/ticket/?projectId=${projectId}&skip=${skip}&take=${take}`)

export const getTicketsLengthForProjectPage = async (projectId: number) => await API.get(`/ticket/?projectId=${projectId}&get-length=true`)

export const getTicketsTypesForProjectPage = async (projectId: number) => await API.get(`/ticket/?projectId=${projectId}&get-tickets-types=true`)

export const getProjectsStatus = async () => await API.get("/projects/?get-projects-status=true") 

export const getProjectsLength = async () => await API.get("/projects/?get-length=true");

export const getMyTickets = async () => await API.get("/tickets")

export const getMyProjects = async (skip: number, take: number) => await API.get(`/projects/?take=${take}&skip=${skip}`)









