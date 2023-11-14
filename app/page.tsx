'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css'
import NameEmailInput from '../components/NameEmailInput';


function Home() {
  const [data, setData] = useState<{ getProjects: Project[] }>({ getProjects: [] });
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<{ projectName: string; units: string[]; role: string }[]>([]);

  interface Unit {
    id: string;
    unitName: string;
    location: { x: number; y: number };
  }

  interface Project {
    id: string;
    projectName: string;
    status: string;
    units: Unit[];
  }
  
  interface userInput{
   firstName: string ;
   lastName: string;
   email: string;
   projectName:string;
   role:string;
   units:string[];
  }

  const [userForm,setUserForm]= useState<userInput>({
    firstName:"",
    lastName:"",
    email:"",
    projectName:"",
    role:"",
    units:[],

  });



  const addSelectedProject = () => {
    const { firstName, lastName, email, projectName, role } = userForm;
  
    if (!firstName || !lastName || !email || !projectName || !role) {
      alert('Please check th fill in all fields or select a project and roles');
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
  
    if (!selectedProjects.some((project) => project.projectName === projectName)) {
      const selectedProject = data.getProjects.find((project) => project.projectName === projectName);
      const updatedUnits = role === 'Admin' ? (selectedProject?.units.map((unit) => unit.unitName) || []) : userForm.units;
      setSelectedProjects([...selectedProjects, { projectName, units: updatedUnits, role }]);
    }
  
    setUserForm({
      ...userForm,
      projectName: '',
      role: '',
      units: [],
    });
  };

  const removeSelectedProject = (projectName: string) => {
    const updatedProjects = selectedProjects.filter((project) => project.projectName !== projectName);
    setSelectedProjects(updatedProjects);
  };

  function handleChange(evt: { target: { value: any; name: any; }; }) {
    const value = evt.target.value;
    setUserForm({
      ...userForm,
      [evt.target.name]: value
    });
  }
  const handleProjectChange = (theSelectedName:string) => {
    const selectedProject = data.getProjects.find(project => project.projectName === theSelectedName)
      setUserForm({
        ...userForm,
        projectName: theSelectedName,
        units:selectedProject?.units ? []: userForm.units,
      })
  }
  const handleSelectAllUnits = () => {
    const selectedProject = data.getProjects.find((project) => project.projectName === userForm.projectName);
    if (selectedProject) {
      const allUnitNames = selectedProject.units.map((unit) => unit.unitName);
      const updatedUnits = selectAll ? [] : allUnitNames;
      setUserForm((prevUserForm) => ({
        ...prevUserForm,
        units: updatedUnits,
        selectAll: !selectAll,
      }));
      setSelectAll(!selectAll);
    }
  };

  const handleUnitChange = (unitName: string, isChecked: boolean) => {
    const selectedProject = data.getProjects.find((project) => project.projectName === userForm.projectName);
    const allUnitNames = selectedProject?.units.map((unit) => unit.unitName) || [];
    const updatedUnits = isChecked
      ? [...userForm.units, unitName]
      : userForm.units.filter((unit) => unit !== unitName);

    setUserForm((prevUserForm) => ({
      ...prevUserForm,
      units: updatedUnits,
      selectAll: updatedUnits.length === allUnitNames.length,
    }));
  };


  const sendInvitationEmail = () => {
    const emailContent = {
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      email: userForm.email,
      selectedProjects: selectedProjects,
    };

    console.log('Sending invitation email', emailContent);
  };



  

  useEffect(() => {
    // i use my own api cuze the api that i have blocked me for many requsts 
    fetch('https://mocki.io/v1/4b4bb8cd-4e16-47b7-98d5-186ae5fe6bb3').then(response => response.json()).then(ress => setData(ress)).catch(errorr => console.log(errorr))
  }, [])


  const HandelClicke = () => {
      console.log(data);
      console.log(userForm);
  }

  return (
    <main className={styles.container}>
      <h1>Invitation Employee System</h1>
      <form className={styles.formContainer}>
      <NameEmailInput
          firstName={userForm.firstName}
          lastName={userForm.lastName}
          email={userForm.email}
          onInputChange={(name, value) => handleChange({ target: { name, value } })}
        />

        <label className={styles.label}>
          Project Name :
          <select className={styles.select} name="projectName" value={userForm.projectName} onChange={(e) => handleProjectChange(e.target.value)}>
            <option value="">Select the Project</option>
            {data.getProjects.map(({ id, projectName }: any) => (
              <option key={id}>{projectName}</option>
            ))}
          </select>
        </label>

        {userForm.projectName && (
        <div className={styles.selectedProjectDetails}>
          <h2>Selected Project Details:</h2>
          <p className={styles.projectName}>Project Name: {userForm.projectName}</p>
          <label className={styles.label}>
            Units:
            <label className={styles.checkboxContainer}>
              <input
                type="checkbox"
                className={styles.checkbox}
                onChange={handleSelectAllUnits}
                checked={selectAll}
              />
              <span className={styles.checkboxLabel}>Select All</span>
            </label>
            {data.getProjects
              .find((project) => project.projectName === userForm.projectName)
              ?.units.map((unit) => (
                <label className={styles.checkboxContainer} key={unit.unitName}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    name={unit.unitName}
                    value={unit.unitName}
                    checked={
                      userForm.role === 'Admin' ||
                      (userForm.units.includes(unit.unitName) && userForm.role === 'User')
                    }
                    onChange={(e) => handleUnitChange(unit.unitName, e.target.checked)}
                  />
                  <span className={styles.checkboxLabel}>{unit.unitName}</span>
                </label>
              ))}
          </label>
          <label className={styles.label}>
            Role:
            <select className={styles.select} name="role" value={userForm.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </label>
        </div>
      )}

      <button className={styles.button} type="button" onClick={addSelectedProject} disabled={!userForm.projectName || !userForm.role}>
          Add Project to List
        </button>
      </form>
      {selectedProjects.length > 0 && (
        <div className={styles.selectedProjects}>
        <h2 className={styles.selectedProjectsHeader}>Selected Projects:</h2>
        <ul className={styles.selectedProjectsList}>
          {selectedProjects.map((selectedProject, index) => (
            <li key={index} className={styles.selectedProjectItem}>
              <strong>{selectedProject.projectName}</strong> Role: {selectedProject.role}, Units: {selectedProject.units.join(', ')}
              <button type="button" className={styles.xbytton} onClick={() => removeSelectedProject(selectedProject.projectName)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <button
            className={styles.invitationButon}
            type="button"
            onClick={sendInvitationEmail}
            disabled={!selectedProjects.length || !userForm.email || !userForm.firstName || !userForm.lastName}
          >
            Send Invitation
          </button>
      </div>
      )}

  <button className={styles.button} onClick={HandelClicke}>Show Data</button>
    </main>
  );
}

export default Home;