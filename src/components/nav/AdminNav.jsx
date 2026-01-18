import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { syncProductEmbeddings } from "../../apiCalls/embeddings"

const AdminNav = () => {
    const [syncing, setSyncing] = useState(false)
    const userToken = useSelector((state) => state && state.user ? state.user.token : null)

    const handleSyncEmbeddings = async () => {
        try {
            setSyncing(true)
            toast.info('Syncing product embeddings to ChromaDB...')
            const result = await syncProductEmbeddings(userToken)
            toast.success(`Sync completed! ${result.data.successCount} products synced successfully.`)
        } catch (err) {
            console.error('Sync error:', err)
            toast.error('Failed to sync embeddings. Please try again.')
        } finally {
            setSyncing(false)
        }
    }

    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to='/admin/dashboard' className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to='/admin/product' className="nav-link">Product</Link>
                </li>
                <li className="nav-item">
                    <Link to='/admin/products' className="nav-link">Products</Link>
                </li>
                <li className="nav-item">
                    <Link to='/admin/category' className="nav-link">Category</Link>
                </li>
                <li className="nav-item">
                    <Link to='/admin/subCategory' className="nav-link">Sub Category</Link>
                </li>
                <li className="nav-item">
                    <Link to='/admin/coupon' className="nav-link">Coupon</Link>
                </li>
                <li className="nav-item">
                    <Link to='/user/password' className="nav-link">Password</Link>
                </li>
                
                {/* Sync Embeddings */}
                <li className="nav-item">
                    <button 
                        className="nav-link"
                        onClick={handleSyncEmbeddings}
                        disabled={syncing}
                        style={{ whiteSpace: 'nowrap' }}
                    >
                        {syncing ? 'Syncing...' : 'Sync Embeddings'}
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default AdminNav;
