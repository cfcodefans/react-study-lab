import React, { JSX, MouseEventHandler, ReactNode, useState } from "react"

declare type TProduct = {
  category: string
  price: string
  stocked: boolean
  name: string
}

const PRODUCTS: TProduct[] = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
]

function ProductCategoryRow({ category }: { category: string }): JSX.Element {
  return <tr>
    <th colSpan={2}>{category}</th>
  </tr>
}

function ProductRow({ product }: { product: TProduct }): JSX.Element {
  return <tr>
    <td>        {product.stocked ? (product.name) : (<span className="red">{product.name}</span>)}      </td>
    <td>{product.price}</td>
  </tr>
}

function ProductTable({
  products,
  filterText,
  inStockOnly,
}: {
  products: TProduct[]
  filterText: string
  inStockOnly: boolean
}): JSX.Element {
  const rows: ReactNode[] = []
  let lastCategory: string = null
  for (let product of products) {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) == -1)
      continue
    if (inStockOnly && !product.stocked) continue
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow category={product.category} />)
    }
    rows.push(<ProductRow product={product} />)
    lastCategory = product.category
  }

  return <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>{rows}</tbody>
  </table>
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onStockOnlyChange,
}: {
  filterText: string
  inStockOnly: boolean
  onFilterTextChange: (string) => void
  onStockOnlyChange: (boolean) => void
}): JSX.Element {
  return <form className="m-3 flex flex-row gap-3">
    <input
      type="text"
      value={filterText}
      placeholder="Search..."
      onChange={(e) => onFilterTextChange(e.target.value)}
    />
    <label>
      <input
        type="checkbox"
        checked={inStockOnly}
        onChange={(e) => onStockOnlyChange(e.target.checked)}
      />{" "}
      Only show products in stock
    </label>
  </form>
}

function FilterableProductTable({ products, }: { products: TProduct[] }): JSX.Element {
  const [filterText, setFilterText] = useState<string>("")
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)
  return <div className="flex flex-col">
    <SearchBar
      filterText={filterText}
      inStockOnly={inStockOnly}
      onFilterTextChange={setFilterText}
      onStockOnlyChange={setInStockOnly}
    />
    <ProductTable
      products={products}
      filterText={filterText}
      inStockOnly={inStockOnly}
    />
  </div>
}

export default function ThinkingInReactPane(): JSX.Element {
  return <>
    <a href="https://react.dev/learn/thinking-in-react">
      https://react.dev/learn/thinking-in-react
    </a>
    <FilterableProductTable products={PRODUCTS} />
  </>
}
