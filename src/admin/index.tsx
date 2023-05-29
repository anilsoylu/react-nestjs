import React, { useState, useEffect } from "react"
import axios from "axios"

interface Cat {
  _id: string
  name: string
  age: number
}

interface CreateCatDto {
  name: string
  age: number
}

const Panel: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([])
  const [name, setName] = useState("")
  const [age, setAge] = useState<number>(0)
  const [editingCatId, setEditingCatId] = useState<string>("")

  useEffect(() => {
    fetchCats()
  }, [])

  const fetchCats = async () => {
    try {
      const response = await axios.get<Cat[]>("http://localhost:3000/cats")
      setCats(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createCat = async () => {
    try {
      const createCatDto: CreateCatDto = { name, age }
      await axios.post("http://localhost:3000/cats", createCatDto)
      fetchCats()
      setName("")
      setAge(0)
      alert("Cat created successfully")
    } catch (error) {
      console.log(error)
      alert("Failed to create cat")
    }
  }

  const deleteCat = async (catId: string) => {
    try {
      await axios.delete(`http://localhost:3000/cats/${catId}`)
      fetchCats()
      alert("Cat deleted successfully")
    } catch (err) {
      console.log(`Hata: ${err}`)
    }
  }

  const editCat = (catId: string, catName: string, catAge: number) => {
    setEditingCatId(catId)
    setName(catName)
    setAge(catAge)
  }

  const cancelEdit = () => {
    setEditingCatId("")
    setName("")
    setAge(0)
  }

  const saveCat = async () => {
    try {
      await axios.put(`http://localhost:3000/cats/${editingCatId}`, {
        name,
        age,
      })
      fetchCats()
      cancelEdit()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cat Panel</h1>
      <div className="flex md:flex-row flex-col mb-4 gap-y-2 md:gap-y-[0] gap-x-[0] md:gap-x-4 justify-start align-middle">
        <h2 className="text-lg font-bold mb-2">Add Cat</h2>
        <input
          className="border border-gray-300 rounded px-2 py-1 mb-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded px-2 py-1 max-h-[42px]"
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <button
          className="bg-indigo-500 text-white px-4 rounded h-[42px]"
          onClick={createCat}
        >
          Add Cat
        </button>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">Cats List</h2>
        <ul className="flex md:flex-row flex-col mb-4 gap-y-2 md:gap-y-[0] gap-x-[0] md:gap-x-4 justify-start align-middle">
          {cats.map((cat) => (
            <li key={cat._id}>
              {editingCatId === cat._id ? (
                <>
                  <input
                    className="border border-gray-300 rounded px-2 py-1 mb-2"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 rounded px-2 py-1 mb-2"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                  <button
                    onClick={saveCat}
                    className="bg-green-500 mr-1 text-white px-2 py-1 rounded min-w-[100px]"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-red-500 text-white px-2 py-1 rounded min-w-[100px]"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-2">
                    <span className="font-bold">Name:</span> {cat.name}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Age:</span> {cat.age}
                  </p>
                  <button
                    onClick={() => editCat(cat._id, cat.name, cat.age)}
                    className="bg-blue-500 mr-3 text-white px-2 py-1 rounded min-w-[100px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCat(cat._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded min-w-[100px]"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Panel
