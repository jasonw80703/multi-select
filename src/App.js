import './App.css';
import MultiSelect from './components/MultiSelect';
import jedis from './fixtures/jedis.json';

function App() {
  return (
    <div className="App">
      <h1>🐝HIVE🐝</h1>
      <MultiSelect
        selectTitle='Jedi'
        values={jedis}
      />
       {/* <MultiSelect
        multiple={true}
        selectTitle='Jedi'
        values={jedis}
      /> */}
    </div>
  );
}

export default App;
