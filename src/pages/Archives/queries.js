import { gql } from 'apollo-boost'
import { BannerFragment } from 'components/Banner'
import { RecordFragment } from 'components/Record'

const banner = gql`
    ${BannerFragment}
    query Banner($bannerId: String!, $bannerTransform: ImageTransformOptions!) {
        pageBanner(id: $bannerId) {
            ...BannerFragment
        }
    }
`

const category = gql`
    ${RecordFragment}
    query Records($transform: ImageTransformOptions!, $categoryId: String!, $skip: Int!, $limit: Int!) {
        category(id: $categoryId) {
            linkedFrom {
                recordCollection(skip: $skip, limit: $limit) {
                    skip
                    limit
                    total
                    items {
                        ...RecordFragment
                    }
                }
            }
        }
    }
`

const archive = gql`
    ${RecordFragment}
    query Records($transform: ImageTransformOptions!, $skip: Int!, $limit: Int!, $order: [RecordOrder]!) {
        recordCollection(skip: $skip, limit: $limit, order: $order) {
            skip
            limit
            total
            items {
                ...RecordFragment
            }
        }
    }
`

const categories = gql`
    query Categories {
        categoryCollection {
            items {
                title
                sys {
                    id
                }
            }
        }
    }
`

export default {
    banner,
    category,
    archive,
    categories
}
