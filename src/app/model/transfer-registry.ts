export interface TransferRegistry {
    transferRegistryId: String,
    fromAccountId: number,
    fromAccountName: String,
    toAccountId: number,
    toAccountName: String,
    amount: number,
    entryDate: number,
    entryDateText: String,
    entryPersona: string,
    acceptedPersona: String,
    acceptedDateText: String,
    fromAccountCatalogCountId: number,
    toAccountCatalogCountId: number
}