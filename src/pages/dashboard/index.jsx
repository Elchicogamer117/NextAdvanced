/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Chart } from 'common/Chart';
import endPoints from 'services/api';
import useFetch from 'hooks/useFetch';
import AdvancedPager from 'components/AdvancedPager';

const PRODUCT_LIMIT = 20;
// const PRODUCT_OFFSET = 4;

export default function Dashboard() {
  const [offsetProducts, setOffsetProducts] = useState(0);
  const products = useFetch(endPoints.products.getRangeProducts(PRODUCT_LIMIT, offsetProducts), offsetProducts);
  const totalProducts = useFetch(endPoints.products.getRangeProducts(0, 0)).length;

  const categoryNames = products?.map((products) => products.category);
  const categoryCount = categoryNames?.map((category) => category.name);
  const categoryOcurrences = (list) => list?.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
  console.log(categoryNames);
  console.log(categoryCount);

  const data = {
    datasets: [
      {
        data: categoryOcurrences(categoryCount),
        borderWith: 2,
        backgroundColor: ['#1e40af', '#1e40af', '#1e40af', '#1e40af', '#1e40af'],
      },
    ],
  };

  return (
    <>
      <div className="w-5/6 ml-auto mr-auto mb-10 mt-2">
        <Chart charData={data} />
      </div>
      <AdvancedPager className="bg-black" totalItems={totalProducts} itemsPerPage={PRODUCT_LIMIT} setOffset={setOffsetProducts} neighbours={3}></AdvancedPager>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={`Product-item-${product.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={product.images[0]} alt="images" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                            {/* <div className="text-sm text-gray-500">{product.email}</div> */}
                          </div>
                        </div>
                      </td>
                      <td className="w-auto px-6 py-4 ">
                        <div className="text-sm text-gray-900">{product.category.name}</div>
                      </td>
                      <td className="w-auto px-6 py-4 ">
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-800 text-white">${product.price}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
