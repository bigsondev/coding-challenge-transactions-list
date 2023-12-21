import { gql } from '@apollo/client';

export const GetAllTransactions = gql`
  query GetAllTransactions {
    getAllTransactions {
      hash
      to
      from
      value
    }
  }
`;

export const GetSingleTransaction = gql`
  query GetSingleTransaction($hash: String!) {
    getTransaction(hash: $hash) {
      gasLimit
      gasPrice
      to
      from
      value
      data
      chainId
      hash
    }
  }
`;

export const SaveTransaction = gql`
  mutation SaveTransaction($transaction: TransactionInput!) {
    addTransaction(transaction: $transaction) {
      hash
    }
  }
`;
