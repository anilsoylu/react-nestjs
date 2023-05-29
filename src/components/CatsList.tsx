import React, { useEffect, useState } from "react"
import axios from "axios"

interface Cat {
  _id: string
  name: string
  age: number
}

interface CatsListProps {
  cats?: Cat[]
}

const CatsList: React.FC<CatsListProps> = () => {
  const [cats, setCats] = useState<Cat[]>([])

  useEffect(() => {
    fetchCats()
  }, [])

  const fetchCats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/cats")
      const catsData = response.data
      setCats(catsData)
    } catch (error) {
      console.error("Error fetching cats:", error)
    }
  }

  if (!cats) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-3xl font-bold underline mb-5">Cats List</h1>
      <ul className="flex flex-col mb-4 gap-y-2 md:gap-y-[0] gap-x-[0] md:gap-x-4 justify-start align-middle">
        {cats.map((cat) => (
          <li
            key={cat._id}
            className="border-b pb-2 mb-2 last:pb-[0] last:mb-[0] last:border-none"
          >
            <p className="mb-2">
              <span className="font-bold">Name:</span> {cat.name}
            </p>
            <p className="mb-2">
              <span className="font-bold">Age:</span> {cat.age}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

CatsList.defaultProps = {
  cats: [],
}

export default CatsList
