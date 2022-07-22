import axios from 'axios';
import FormProduct from 'components/FromProduct';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import endPoints from 'services/api';

export default function Edit() {
  const [product, setProduct] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    }
    getProduct();
  }, [router?.isReady]);

  return <FormProduct product={product} />;
}
