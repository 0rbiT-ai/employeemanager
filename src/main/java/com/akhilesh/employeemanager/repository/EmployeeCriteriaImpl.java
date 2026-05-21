package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Employee;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
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
    public List<Employee> findEmployeesByNameRoleDepartment(String name, String role, String departmentName){
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Employee> cq = cb.createQuery(Employee.class);

        Root<Employee> employee = cq.from(Employee.class);
        List<Predicate> predicates = new ArrayList<>();
        if(name!=null){
            predicates.add(cb.like(cb.lower(employee.get("name")),"%"+name.toLowerCase()+"%"));
        }
        if(role!=null){
            predicates.add(cb.equal(cb.lower(employee.get("role")),role.toLowerCase()));
        }
        if(departmentName!=null){
            predicates.add(cb.equal(cb.lower(employee.get("department").get("departmentName")),departmentName.toLowerCase()));
        }
        cq.where(predicates.toArray(new Predicate[0]));

        return em.createQuery(cq).getResultList();
    }
}
