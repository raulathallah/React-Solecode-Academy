export const Header= ({ setView }) =>{

    return (
        
    <div>
        <button onClick={() => setView('exercise1')}> Exercise 1</button>
        <button onClick={() => setView('exercise4')}> Exercise 4</button>
    </div>
    
    );
    
    }