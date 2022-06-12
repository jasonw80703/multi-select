import './App.css';
import MultiSelect from './components/MultiSelect';
import jedis from './fixtures/jedis.json';
import accountNumbers from './fixtures/accountNumbers.json';

function App() {
  return (
    <div className="App">
      <h1>🐝HIVE🐝</h1>
      <div>
        <MultiSelect
          title='Account Number'
          values={accountNumbers}
        />
      </div>
      <div>
       <MultiSelect
          label='List of Jedi throughout the universe'
          multiple={true}
          title='Jedi'
          values={jedis}
        />
      </div>
      <div>
       <MultiSelect
          values={[1, 2, 3]}
        />
      </div>
      <div>
       <MultiSelect
          title='No values'
          values={[]}
        />
      </div>
    </div>
  );
}

export default App;
