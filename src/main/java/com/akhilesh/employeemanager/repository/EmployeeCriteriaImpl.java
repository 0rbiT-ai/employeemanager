package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Employee;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class EmployeeCriteriaImpl implements EmployeeCriteria{
    EntityManager em;
    public EmployeeCriteriaImpl(EntityManager em){
        this.em = em;
    }
    @Override
    public List<Employee> findEmployeesByNameRoleDepartment(String name, String role, String departmentName, String order, String dir){
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Employee> cq = cb.createQuery(Employee.class);

        Root<Employee> employee = cq.from(Employee.class);
        List<Predicate> predicates = new ArrayList<>();
        List<Order> orders = new ArrayList<>();
        if(name!=null){
            predicates.add(cb.like(cb.lower(employee.get("name")),"%"+name.toLowerCase()+"%"));
        }
        if(role!=null){
            predicates.add(cb.equal(cb.lower(employee.get("role")),role.toLowerCase()));
        }
        if(departmentName!=null){
            predicates.add(cb.equal(cb.lower(employee.get("department").get("departmentName")),departmentName.toLowerCase()));
        }
        if(order!=null){
            if(order.equalsIgnoreCase("name") ||
                    order.equalsIgnoreCase("email") ||
                    order.equalsIgnoreCase("role")){
                if(dir!=null && dir.equalsIgnoreCase("desc")){
                    orders.add(cb.desc(employee.get(order)));
                }
                else{
                    orders.add(cb.asc(employee.get(order)));
                }
            }
        }
        cq.where(predicates.toArray(new Predicate[0])).orderBy(orders);

        return em.createQuery(cq).getResultList();
    }
}
