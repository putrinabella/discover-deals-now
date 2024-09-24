const Product = () => {
  return (
    <div className="posts">
      <div className="post-item">
        <img
          tabIndex="0"
          aria-label={`Gambar produk `}
          className="thumbnail"
          src="https://via.placeholder.com/600x400"
          alt={`Gambar produk`}
        />

        <div className="rating">
          <p>⭐ 4.8/5</p>
        </div>

        <div className="product-content">
          <h3>
            <a href={`/#/detail/$1`} className="title">
              Jam Tangan
            </a>
          </h3>
          <p className="inline-block text-left px-2 border border-gray-950 rounded-full">
            Accessories
          </p>

          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
            veniam. Tempore sed animi cupiditate. Aperiam architecto unde culpa
            ad eos mollitia eius dolorem, sint ratione quas fugit placeat
            temporibus minus.
          </p>
          <p className="text-xl font-bold text-green-600">Rp. 500.000,-</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>

            <span>Detail</span>
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span>Add to Chart</span>
          </button>
        </div>
      </div>
      <div className="post-item">
        <img
          tabIndex="0"
          aria-label={`Gambar produk `}
          className="thumbnail"
          src="https://via.placeholder.com/600x400"
          alt={`Gambar produk`}
        />

        <div className="rating">
          <p>⭐ 4.8/5</p>
        </div>

        <div className="product-content">
          <h3>
            <a href={`/#/detail/$1`} className="title">
              Jam Tangan
            </a>
          </h3>
          <p className="inline-block text-left px-2 border border-gray-950 rounded-full">
            Accessories
          </p>

          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
            veniam. Tempore sed animi cupiditate. Aperiam architecto unde culpa
            ad eos mollitia eius dolorem, sint ratione quas fugit placeat
            temporibus minus.
          </p>
          <p className="text-xl font-bold text-green-600">Rp. 500.000,-</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>

            <span>Detail</span>
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span>Add to Chart</span>
          </button>
        </div>
      </div>
      <div className="post-item">
        <img
          tabIndex="0"
          aria-label={`Gambar produk `}
          className="thumbnail"
          src="https://via.placeholder.com/600x400"
          alt={`Gambar produk`}
        />

        <div className="rating">
          <p>⭐ 4.8/5</p>
        </div>

        <div className="product-content">
          <h3>
            <a href={`/#/detail/$1`} className="title">
              Jam Tangan
            </a>
          </h3>
          <p className="inline-block text-left px-2 border border-gray-950 rounded-full">
            Accessories
          </p>

          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
            veniam. Tempore sed animi cupiditate. Aperiam architecto unde culpa
            ad eos mollitia eius dolorem, sint ratione quas fugit placeat
            temporibus minus.
          </p>
          <p className="text-xl font-bold text-green-600">Rp. 500.000,-</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>

            <span>Detail</span>
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span>Add to Chart</span>
          </button>
        </div>
      </div>
      <div className="post-item">
        <img
          tabIndex="0"
          aria-label={`Gambar produk `}
          className="thumbnail"
          src="https://via.placeholder.com/600x400"
          alt={`Gambar produk`}
        />

        <div className="rating">
          <p>⭐ 4.8/5</p>
        </div>

        <div className="product-content">
          <h3>
            <a href={`/#/detail/$1`} className="title">
              Jam Tangan
            </a>
          </h3>
          <p className="inline-block text-left px-2 border border-gray-950 rounded-full">
            Accessories
          </p>

          <p className="description font-quicksand">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
            veniam. Tempore sed animi cupiditate. Aperiam architecto unde culpa
            ad eos mollitia eius dolorem, sint ratione quas fugit placeat
            temporibus minus.
          </p>
          <p className="text-xl font-bold text-green-600">Rp. 500.000,-</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>

            <span>Detail</span>
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <span>Add to Chart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
