function App() { 
  const items = ['Apple', 'Melon', 'Cherry'];
  return ( 
    <div>
      <h1>My List</h1>
      <ul className="p-4">
        {items.map((item, index) => (
          <li key={index} className="mb-2 text-lg">{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default App


