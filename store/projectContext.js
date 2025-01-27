import { createContext, useReducer, useState } from "react";


export const ProjectContext = createContext({
  projectsData: [],
  formsData: [],
  setProjects: (projects)=> {},
  setForms: (formsData) => {},
  addForms: (formsData) => {},
  addProjects: (projects) => {},
  deleteProject: (id) => {},
  editProject: (id, project) => {},
});

// the use of Reducer function
function projectReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // const id = new Date().toString() + Math.random().toString();
      return [ ...action.payload];
    case "ADDFORMS":
      // const id = new Date().toString() + Math.random().toString();
      return [ ...action.payload];
    case "SET":
      const inverted = action.payload.reverse();
      return  inverted;
    case "DELETE":
      return state.filter((project) => project.id !== action.payload);
    case "UPDATE":
      const updatedIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updatebleProject = state[updatedIndex];
      const updatedItem = { ...updatebleProject, ...action.payload.data };
      const updatedProjects = [...state];
      updatedProjects[updatedIndex] = updatedItem;
      return updatedProjects;
    default:
      return state;
  }
}

function ProjectContextProvider({ children }) {
  const [projectsState, dispatch] = useReducer(projectReducer, []);

  function addProjects(data) {
    dispatch({ type: "ADD", payload: data });
  }

  function addForms(data){
   dispatch({type: "ADDFORM", payload: data})
  }

  function deleteProject(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function setProjects(project){
    dispatch({type: "SET", payload: project})
  }

  function editProject(id, data) {

    dispatch({ type: "UPDATE", payload: { id: id, data: data } });
  }

  const value = {
    addProjects: addProjects,
    deleteProject: deleteProject,
    editProject: editProject,
    setProjects: setProjects,
    projectsData: projectsState,
    addForms: addForms,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export default ProjectContextProvider;
