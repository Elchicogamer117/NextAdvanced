import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ValidationSchema } from 'common/ValidationSchema';
import { addProduct, updateProduct } from 'services/api/products';
import { useRouter } from 'next/router';

export default function FormProduct({ setOpen, setAlert, product }) {
  const formRef = useRef(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(ValidationSchema),
  });

  const onSubmit = (data) => {
    const dataFormat = {
      title: data.title,
      price: data.price,
      description: data.description,
      categoryId: parseInt(data.category),
      images: [data.images[0].name],
    };
    if (product) {
      updateProduct(product.id, dataFormat).then(() => {
        router.push('/dashboard/products/');
      });
    } else {
      addProduct(dataFormat)
        .then(() => {
          setAlert({
            active: true,
            message: 'Product added succesfully',
            type: 'success',
            autoClose: true,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: error.message,
            type: 'error',
            autoClose: true,
          });
        });
    }
  };

  useEffect(() => {
    const categoryTag = document.querySelector('#category');
    categoryTag.value = product?.category?.id;
  }, [product]);

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-800">
                Title
              </label>
              <input
                defaultValue={product?.title}
                {...register('title')}
                type="text"
                name="title"
                id="title"
                className={`mt-1 focus:ring-blue-800 focus:border-blue-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.title && 'border-red-600'}`}
              />
              {errors.title && <span className="text-red-600 font-thin text-sm">{errors.title.message}</span>}
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                defaultValue={product?.price}
                {...register('price')}
                type="number"
                name="price"
                id="price"
                className={`mt-1 focus:ring-blue-800 focus:border-blue-800 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.price && 'border-red-600'}`}
              />
              {errors.price && <span className="text-red-600 font-thin text-sm">{errors.price.message}</span>}
            </div>
            <div className="col-span-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                defaultValue={product?.category}
                id="category"
                name="category"
                {...register('category')}
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm"
              >
                <option value="1">Clothes</option>
                <option value="2">Electronics</option>
                <option value="3">Furniture</option>
                <option value="4">Toys</option>
                <option value="5">Others</option>
              </select>
            </div>

            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                defaultValue={product?.description}
                name="description"
                id="description"
                {...register('description')}
                autoComplete="description"
                rows="3"
                className={`form-textarea mt-1 block w-full focus:ring-blue-800 focus:border-blue-800 shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.description && 'border-red-600'}`}
              />
              {errors.description && <span className="text-red-600 font-thin text-sm">{errors.description.message}</span>}
            </div>
            <div className="col-span-6">
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                  Cover photo
                </label>
                <div className="mt-1 flex justify-center px-6 py-2 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-800 hover:text-blue-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-800"
                      >
                        <span>Upload a file</span>
                        <input defaultValue={product?.images} {...register('images')} id="images" name="images" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                {errors.images && <span className="text-red-600 font-thin text-sm text-center w-full">{errors.images.message}</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
