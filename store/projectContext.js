import { createContext, useReducer, useState } from "react";


export const ProjectContext = createContext({
  projectsData: [],
  formsData: [],
  setProjects: (projects)=> {},
  setForms: (formsData) => {},
  addFormSelects: (forms) => {},
  addForms: (formsData) => {},
  addProjects: (projects) => {},
  deleteProject: (id) => {},
  editProject: (id, project) => {},
  setFormNumber: (forms) => {},
  addFormInputs: (forms) => {},
  formInputData: [],
  formsSelectData: [],
});

// the use of Reducer function
function projectReducer(state, action) {
  switch (action.type) {
    case "ADD":
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

// formReducer
function formReducer(state, action) {
  switch (action.type) {
    case "ADDFORM":
      // const id = new Date().toString() + Math.random().toString();
      return [ ...action.payload];
    default:
      return state;
  }
}


function formNumberReducer(state, action) {
  switch (action.type) {
    case "SETFORMNUMBERS":
      return [...action.payload];
    default:
      return state;
  }
}

function formInputsReducer (state, action) {
  switch (action.type) {
    case "ADDINPUTFORMS":
      return [...action.payload];
    default:
      return state;
  }
}

function formSelectsReducer (state, action) {
   switch (action.type){
    case "ADDSELECT":
      return [...action.payload];
      default:
      return state;
   }
}


function ProjectContextProvider({ children }) {
  const [projectsState, dispatch] = useReducer(projectReducer, []);
  const [formsState, dispatchForm] = useReducer(formReducer, []);
  const [formNumbersState, dispatchFormNumber] = useReducer(formNumberReducer, [])
  const [formInputsState, dispatchFormInputs] = useReducer(formInputsReducer, [])
  const [formSelectsState, dispatchFormSelect] = useReducer(formSelectsReducer, [])


  function addProjects(data) {
    dispatch({ type: "ADD", payload: data });
  }

  function addForms(data){
   dispatchForm({type: "ADDFORM", payload: data})
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

  function setFormNumber(data){
   dispatchFormNumber({type: "SETFORMNUMBERS", payload: data})
  }

  function addFormInputs (data){
   dispatchFormInputs({type: "ADDINPUTFORMS", payload: data})
  }


  function addFormSelects (data){
    dispatchFormSelect({type: "ADDSELECT", payload: data})
  }

  const value = {
    addProjects: addProjects,
    deleteProject: deleteProject,
    editProject: editProject,
    setProjects: setProjects,
    projectsData: projectsState,
    formsData: formsState,
    addForms: addForms,
    setFormNumber: setFormNumber,
    formNumbers: formNumbersState,
    formInputData: formInputsState,
    addFormInputs: addFormInputs,
    formsSelectData: formSelectsState,
    addFormSelects: addFormSelects,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export default ProjectContextProvider;
