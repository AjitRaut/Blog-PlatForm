function CategoriesSection({ categories }) {
    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
            <div className="grid md:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <Link key={category.id} to={`/category/${category.slug}`} className="block bg-blue-800 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700">
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CategoriesSection