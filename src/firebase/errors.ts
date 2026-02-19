'use client';

// We are no longer importing from 'firebase/auth' to avoid server-side issues.

type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

// This interface is simplified. The 'auth' property is no longer detailed
// because we cannot safely access auth state during server-side builds.
interface SecurityRuleRequest {
  auth: null;
  method: string;
  path: string;
  resource?: {
    data: any;
  };
}

/**
 * Builds the simulated request object for the error message, omitting auth details.
 * @param context The context of the failed Firestore operation.
 * @returns A structured request object.
 */
function buildRequestObject(context: SecurityRuleContext): SecurityRuleRequest {
  return {
    auth: null, // Auth details are omitted to prevent server-side build errors.
    method: context.operation,
    path: `/databases/(default)/documents/${context.path}`,
    resource: context.requestResourceData ? { data: context.requestResourceData } : undefined,
  };
}

/**
 * Builds the final, formatted error message.
 * @param requestObject The simulated request object.
 * @returns A string containing the error message and a JSON payload.
 */
function buildErrorMessage(requestObject: SecurityRuleRequest): string {
  return `Missing or insufficient permissions: The following request was denied by Firestore Security Rules:
${JSON.stringify(requestObject, null, 2)}`;
}

/**
 * A custom error class designed for debugging Firestore security rule denials.
 * It structures the error to mimic the request object available in security rules,
 * but omits auth details to ensure build stability across environments.
 */
export class FirestorePermissionError extends Error {
  public readonly request: SecurityRuleRequest;

  constructor(context: SecurityRuleContext) {
    const requestObject = buildRequestObject(context);
    super(buildErrorMessage(requestObject));
    this.name = 'FirebaseError';
    this.request = requestObject;
  }
}
